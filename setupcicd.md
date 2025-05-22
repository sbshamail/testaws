# Next.js App Deployment to EC2 — Full Setup Guide (No Docker)

---

```bash
ssh -i "C:/Users/user/.ssh/aws.pem" ubuntu@51.21.167.117
```

## 1. NGINX Setup (for HTTP/HTTPS Reverse Proxy)

### Step 1: Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

### Step 2: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/next-app
```

#### Paste the following configuration (replace YOUR_DOMAIN_OR_IP):

```js
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Step 3: Enable the Nginx config and restart

```bash
sudo ln -s /etc/nginx/sites-available/next-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

```

## 2. Stop Old Docker Containers (If Previously Used)

Stop and remove running containers

```bash
docker ps
docker stop <container_id>
docker rm <container_id>
docker system prune -a

```

## 3. GitHub Actions Workflow (CI/CD Deployment to EC2)

### Required Secrets

In GitHub repository Settings > Secrets and Variables > Actions, add:

EC2_HOST — Your EC2 public DNS or IP

EC2_SSH_KEY — Your private .pem key content (multi-line secret)

### ecosystem.config.js (at project root)

```js
module.exports = {
  apps: [
    {
      name: "next-app",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
```

### .github/workflows/deploy.yml

```yml
name: Deploy to EC2 (no Docker)

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy via SSH
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 22

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Build the app
        run: npm run build

      - name: Deploy files to EC2
        uses: appleboy/scp-action@v0.1.4
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          source: ".next,package.json,package-lock.json,public,ecosystem.config.js"
          target: "/home/ubuntu/actions-runner/_work/testaws/testaws"

      - name: SSH and restart app with PM2
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
            nvm use 22
            cd ~/actions-runner/_work/testaws/testaws
            npm install --legacy-peer-deps --production
            pm2 describe next-app > /dev/null 2>&1 && pm2 restart next-app || pm2 start ecosystem.config.js
```

## 4. PM2 Commands (Manual Control)

pm2 start ecosystem.config.js
pm2 restart next-app
pm2 logs next-app
pm2 list
pm2 save
pm2 startup

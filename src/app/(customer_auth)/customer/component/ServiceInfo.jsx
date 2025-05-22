import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/shadButton";
import AddMoreInformation from "./AddMoreInformation";
import ContractHistory from "./ContractHistory";

const ServiceInfo = ({
  GetCustomerById,
  ListAllAdditionalInfo,
  fetchCustomer,
  GetCustomerContractsHistory,
}) => {
  const { DealerTitle, DealerTelephone } = GetCustomerById || {};
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
      <Card className="">
        <CardHeader className="pb-3">
          <CardDescription>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1 text-sm">
                <div className="text-xl text-card-foreground">
                  {DealerTitle}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Phone:</span>
                  <a className="text-blue-600 hover:underline">
                    {DealerTelephone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Website:</span>
                  <Link
                    href="/customer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    http://portal.mypcp.us
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Button variant={"link"} onClick={() => setMoreInfoOpen(true)}>
                  More Info
                </Button>
                <Button variant={"link"} onClick={() => setHistoryOpen(true)}>
                  Contract History
                </Button>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      {moreInfoOpen && (
        <AddMoreInformation
          ListAllAdditionalInfo={ListAllAdditionalInfo}
          fetchCustomer={fetchCustomer}
          open={moreInfoOpen}
          close={() => setMoreInfoOpen(false)}
        />
      )}
      {historyOpen && (
        <ContractHistory
          open={historyOpen}
          close={() => setHistoryOpen()}
          historyData={GetCustomerContractsHistory}
        />
      )}
    </>
  );
};

export default ServiceInfo;

import React, { useEffect, useState } from "react";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Table from "@/components/cui/table";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { engFormatDate } from "@/utils/helpers";
import { AiOutlineNotification } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import DeleteModal from "./modal/DeleteModal";
import SendCampaignModal from "./modal/SendCampaignModal";
const ShowList = ({
  TotalRec,
  campaigns,
  handleEditCampaign,
  fetchCampaigns,
  DealerID,
}) => {
  const [filterCampaignList, setFilterCampaignList] = useState([]);
  const [emailStatusFilter, setEmailStateFilter] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isSendCampaignModal, setIsSendCampaignModal] = useState(null);

  useEffect(() => {
    setFilterCampaignList(campaigns);
  }, [campaigns]);
  const handleFilterCampaign = (filter) => {
    setEmailStateFilter(filter);
    if (filter === "all") {
      setFilterCampaignList(campaigns);
    } else {
      const filtering = campaigns.filter((item) => item.EmailStatus === filter);
      setFilterCampaignList(filtering);
    }
  };

  const CampaignRender = ({ row }) => {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-primary/20 p-2 rounded">
          <AiOutlineNotification className="text-xl text-primary" />
        </div>
        <div>
          <h2 className="font-bold">{row.CampaignName}</h2>
          <p>
            {row.DealerTitle} - {engFormatDate(row.StartDate)} to{" "}
            {engFormatDate(row.EndDate)}
          </p>
        </div>
      </div>
    );
  };
  const EmailStatusRender = ({ cell }) => (
    <div className="bg-yellow-200 p-2 text-red-400 rounded-full flex items-center justify-center w-max">
      {cell}
    </div>
  );
  const ActionRender = ({ row }) => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="cursor-pointer">
          <HiDotsVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 ">
        <DropdownMenuItem
          onClick={() => handleEditCampaign(row)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <MdEdit className="text-muted-foreground" />
          Edit Campaign
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setIsSendCampaignModal(true);
            setSelectedCampaign(row);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <IoIosSend className="text-muted-foreground" />
          Send Campaign
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center cursor-pointer gap-2 text-red-500 focus:text-red-600"
          onClick={() => {
            setIsDeleteDialogOpen(true);
            setSelectedCampaign(row);
          }}
        >
          <MdDelete />
          Delete Campaign
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  const columns = [
    {
      title: "Campaign",
      render: CampaignRender,
      className: "whitespace-nowrap",
    },
    { title: "Campaign Type", accessor: "CampaignType" },
    {
      title: "Email Status",
      accessor: "EmailStatus",
      render: EmailStatusRender,
      className: "text-center",
    },
    {
      render: ActionRender,
      className: "text-center ",
    },
  ];
  return (
    <>
      {filterCampaignList && (
        <div>
          <ShadowContainer className={"w-full flex flex-col gap-6 "}>
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">{TotalRec} Campaigns</h1>
              <div className="flex items-center gap-2">
                <CustomButton
                  variant="accent"
                  className={emailStatusFilter === "all" && "bg-primary"}
                  onClick={() => handleFilterCampaign("all")}
                >
                  All Campaigns
                </CustomButton>
                <CustomButton
                  variant="accent"
                  className={emailStatusFilter === "Pending" && "bg-primary"}
                  onClick={() => handleFilterCampaign("Pending")}
                >
                  Pending
                </CustomButton>
                <CustomButton
                  variant="accent"
                  className={
                    emailStatusFilter === "Unfinalized" && "bg-primary"
                  }
                  onClick={() => handleFilterCampaign("Unfinalized")}
                >
                  Unfinalized
                </CustomButton>
                <CustomButton
                  variant="accent"
                  className={emailStatusFilter === "Sent" && "bg-primary"}
                  onClick={() => handleFilterCampaign("Sent")}
                >
                  Sent
                </CustomButton>
              </div>
            </div>
            <div className="w-full relative">
              <Table columns={columns} data={filterCampaignList} />
            </div>
          </ShadowContainer>
        </div>
      )}
      {isDeleteDialogOpen && (
        <DeleteModal
          open={isDeleteDialogOpen}
          campaign={selectedCampaign}
          setCampaign={setSelectedCampaign}
          close={() => setIsDeleteDialogOpen(false)}
          fetchCampaigns={fetchCampaigns}
        />
      )}
      {isSendCampaignModal && (
        <SendCampaignModal
          open={isSendCampaignModal}
          close={() => setIsSendCampaignModal(false)}
          campaign={selectedCampaign}
          setCampaign={setSelectedCampaign}
          fetchCampaigns={fetchCampaigns}
        />
      )}
    </>
  );
};

export default ShowList;

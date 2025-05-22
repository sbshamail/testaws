import Checkbox from "@/components/cui/textField/Checkbox";
import { fetchPostObj } from "@/utils/action/function";
import clsx from "clsx";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const showDeleteAlertModal = ({
  element,
  auth,
  Token,
  contractIds,
  setOffSetData,
}) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-danger",
      input: "form-control",
    },
    buttonsStyling: true,
  });

  swalWithBootstrapButtons.fire({
    title: element.title,
    text: element.question,
    icon: "warning",
    input: "text",
    confirmButtonColor: "#06b6d4",
    cancelButtonColor: "#A9A9A9",
    inputPlaceholder: element.messageTitle,
    inputValidator: (value) => {
      if (!value || value.length < 10) {
        return element.dangertext;
      }
    },
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Close",
    reverseButtons: true,
    showLoaderOnConfirm: true,
    preConfirm: async (reason) => {
      const data = { ContractID: contractIds, DeletionReason: reason };
      const res = await fetchPostObj({
        api: "contracts/deletecontracts",
        auth,
        Token,
        data,
        isValue: true,
      });

      if (res.success === 1) {
        swalWithBootstrapButtons.fire({
          title: "Success!",
          text: res.message,
          icon: "success",
        });
        setOffSetData((prev) => (prev ? prev : "0"));
      } else {
        swalWithBootstrapButtons.fire({
          title: "Error",
          text: res.message,
          icon: "error",
        });
      }
    },
  });
};
export const deleteContract = ({ auth, Token, contractIds, setOffSetData }) => {
  let element = {
    title: "Delete Contract",
    question: "Are you sure you want to delete the selected contract?",
    messageTitle: "Enter reason for deleting the contract",
    dangertext:
      "* Reason for deleting the contract must be at least 10 characters",
  };

  showDeleteAlertModal({ element, auth, Token, contractIds, setOffSetData });
};

export const DeleteTitle = ({
  selectedDelRows,
  auth,
  Token,
  setOffSetData,
  isDeleteAllowed,
}) => {
  const deleteContracts = () => {
    const contractIds = selectedDelRows
      .map((item) => item.ContractID)
      .join(",");
    deleteContract({ auth, Token, contractIds, setOffSetData });
  };
  return (
    <div className="flex items-center justify-center">
      <MdDelete
        onClick={isDeleteAllowed ? deleteContracts : () => {}}
        className={clsx(
          "text-xl transition  text-gray-400", // default classes
          {
            "hover:text-red-500 cursor-pointer": isDeleteAllowed, // applies when isDeleteAllowed is true
            " hover:none": !isDeleteAllowed, // applies when isDeleteAllowed is false
          }
        )}
      />
    </div>
  );
};

export const DeleteContractCheckbox = ({
  row,
  selectedRows,
  setSelectedRows,
  isDeleteAllowed,
  GLOBAL_RESPONSE,
}) => {
  const toggle = () => {
    if (selectedRows?.some((s) => s.ContractID === row.ContractID)) {
      setSelectedRows(
        selectedRows?.filter((item) => item.ContractID !== row.ContractID)
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  return (
    <div>
      {GLOBAL_RESPONSE?.IsDeleteContract === "1" &&
        row.IsSubscription == "0" &&
        row.MobileAppUsed == "0" &&
        row.MaintananceProductContract == "0" && (
          <Checkbox
            onChange={toggle}
            checked={selectedRows.some((s) => s.ContractID === row.ContractID)}
          />
        )}
    </div>
  );
};

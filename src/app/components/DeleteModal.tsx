"use client";
import React, { useEffect, useState } from "react";

const DeleteModal = ({ data, selected, onSubmit }) => {
  const handleClose = (modalId: any) => {
    window[modalId]?.close();
  };
  console.log(data);
  console.log(selected);

  let index = -1;

  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    if (JSON.stringify(obj) === JSON.stringify(selected)) {
      index = i + 1;
      break;
    }
  }

  return (
    <div>
      <dialog id="delete" className="modal rounded-md">
        <div className="modal-box p-4 bg-white shadow-md w-[360px]">
          <h3 className="font-bold text-lg">Delete ({index})</h3>
          <div className="modal-action mt-4 flex justify-end">
            <button
              onClick={() => handleClose("delete")}
              className="w-20 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none m-2"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(selected)}
              className="w-20 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none m-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteModal;

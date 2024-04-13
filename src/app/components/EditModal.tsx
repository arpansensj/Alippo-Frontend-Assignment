"use client";
import React, { useEffect, useState } from "react";

const EditModal = ({
  selected,
  onSubmit,
}: {
  data: any;
  selected: any;
  onSubmit: any;
}) => {
  const [name, setName] = useState("");
  const handleClose = (modalId: any) => {
    window[modalId]?.close();
    setName("");
  };
  const handleSubmit = () => {
    onSubmit(name, selected.index); // Pass the updated name to onSubmit callback
    handleClose("edit"); // Close the modal
  };

  useEffect(() => {
    if (selected && Object.keys(selected).length) {
      setName(selected?.data?.name);
    }
  }, [selected]);

  return (
    <div>
      <dialog id="edit" className="modal rounded-md">
        <div className="modal-box bg-white p-4 rounded shadow-md w-[360px]">
          <h3 className="font-bold text-lg">Edit Name</h3>
          <div className="flex gap-2 mt-4">
            <label className="form-control w-full">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full px-2"
              />
            </label>
          </div>
          <div className="modal-action mt-4 flex justify-end">
            <button
              onClick={() => handleClose("edit")}
              className="w-20 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none m-2"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit()}
              className="w-20 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none m-2"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditModal;

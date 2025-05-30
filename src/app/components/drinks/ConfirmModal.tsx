"use client";
import React from "react";

type ConfirmModalProps = {
  ime: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({ ime, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Izbaciti &quot;{ime}&quot; iz košarice?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded font-semibold hover:bg-gray-400"
            onClick={onCancel}
          >
            Odustani
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
            onClick={onConfirm}
          >
            Izbaci
          </button>
        </div>
      </div>
    </div>
  );
}

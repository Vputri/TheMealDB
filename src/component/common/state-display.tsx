"use client";

import React from "react";
import { EmptyIcon } from "@/component/ui/Icon";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state-container" id="error-state">
      <div className="state-icon state-icon--error">⚠️</div>
      <h3 className="state-title">Oops! Terjadi Kesalahan</h3>
      <p className="state-message">{message}</p>
      {onRetry && (
        <button className="state-button" onClick={onRetry} type="button">
          Coba Lagi
        </button>
      )}
    </div>
  );
}

type EmptyStateProps = {
  title?: string;
  message?: string;
};

export function EmptyState({
  title = "Tidak Ada Hasil",
  message = "Coba gunakan kata kunci lain untuk pencarian.",
}: EmptyStateProps) {
  return (
    <div className="state-container" id="empty-state">
      <EmptyIcon className="state-icon-svg" />
      <h3 className="state-title">{title}</h3>
      <p className="state-message">{message}</p>
    </div>
  );
}

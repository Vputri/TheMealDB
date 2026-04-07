"use client";

import React from "react";

type SkeletonCardProps = {
  count?: number;
};

export function SkeletonCard({ count = 8 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-image skeleton-pulse" />
          <div className="skeleton-content">
            <div className="skeleton-title skeleton-pulse" />
            <div className="skeleton-text skeleton-pulse" />
          </div>
        </div>
      ))}
    </>
  );
}

export function SkeletonDetailHero() {
  return (
    <div className="skeleton-detail-hero">
      <div className="skeleton-hero-image skeleton-pulse" />
      <div className="skeleton-hero-content">
        <div className="skeleton-hero-title skeleton-pulse" />
        <div className="skeleton-hero-badges">
          <div className="skeleton-badge skeleton-pulse" />
          <div className="skeleton-badge skeleton-pulse" />
        </div>
        <div className="skeleton-hero-text skeleton-pulse" />
        <div className="skeleton-hero-text skeleton-pulse" style={{ width: "80%" }} />
        <div className="skeleton-hero-text skeleton-pulse" style={{ width: "60%" }} />
      </div>
    </div>
  );
}

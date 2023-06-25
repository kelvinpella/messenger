"use client";
import useActiveChannel from "@/common/hooks/useActiveChannel";
import React from "react";

export default function ActiveStatus() {
  useActiveChannel();
  return null;
}

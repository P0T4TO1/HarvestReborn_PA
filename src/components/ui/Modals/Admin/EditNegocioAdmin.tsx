"use client";

import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  CircularProgress,
} from "@nextui-org/react";
import React, { useState } from "react";
import { hrApi } from "@/api";
import { toast } from "sonner";
import { adminEditProductValidation } from "@/validations/admin.validation";
import { DANGER_TOAST, SUCCESS_TOAST } from "@/components";
import { useForm } from "react-hook-form";
import { IProduct } from "@/interfaces";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

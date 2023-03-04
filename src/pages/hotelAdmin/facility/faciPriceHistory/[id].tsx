import { doGetFaciPriceHistory } from "@/redux/action/actionFPH";
import { doFaciAdminReq } from "@/redux/action/actionFaciAdmin";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import { ColumnType } from "antd/es/table";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsClockHistory } from "react-icons/bs";
import dayjs from "dayjs";

export default function Fapho() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const fphHotel = useSelector(
    (state: any) => state.FaciPriceHistoryReducer.fph
  );
  console.log("object", fphHotel);
  const fphOne = fphHotel.filter((item: any) => item.faph_faci_id == id);

  // reducer faci
  const faciHotel = useSelector(
    (state: any) => state.FaciAdminReducer.faciAdmin
  );
  const faciOne = faciHotel?.find((item: any) => item.faci_id == id);

  useEffect(() => {
    dispatch(doGetFaciPriceHistory());
    dispatch(doFaciAdminReq());
  }, []);
  const columns: ColumnType<any>[] = [
    {
      title: "No.",
      dataIndex: "index",
      render: (text: any, record: any, index: any) => index + 1,
      fixed: "left",
    },
    {
      title: "start date",
      key: "index",
      render: (text: any, record: any, index) => (
        <p className="w-32 text-xs">
          {dayjs(record.faph_startdate).format("DD MMMM YYYY hh:mm:ss")}
        </p>
      ),
    },
    {
      title: "end date",
      key: "index",
      render: (text: any, record: any, index) => (
        <p className="w-32 text-xs">
          {dayjs(record.faph_endate).format("DD MMMM YYYY hh:mm:ss")}
        </p>
      ),
    },
    {
      title: "low price",
      dataIndex: "faph_low_price",
      key: "faph_low_price",
    },
    {
      title: "high price",
      dataIndex: "faph_high_price",
      key: "faph_high_price",
    },
    {
      title: "discount",
      dataIndex: "faph_discount",
      key: "faph_discount",
    },
  ];

  return (
    <div className="w-3/4 mx-auto text-center">
      <div className="flex justify-between py-3">
        <div className="flex justify-start space-x-3">
          <BsClockHistory className="text-2xl" />
          <span className="text-2xl font bold">{faciOne?.faci_name}</span>
        </div>
        <span>
          {dayjs(faciOne?.faci_modified_date).format("DD MMMM YYYY hh:mm:ss")}
        </span>
      </div>
      <hr className="text-gray-600 font-bold py-4" />
      <span className="text-base text-gray-300 flex justify-start">
        history facility price :
      </span>
      <Table
        scroll={{ x: true }}
        size="small"
        dataSource={fphOne}
        columns={columns}
      />
    </div>
  );
}

import { doFaciAdminReq } from "@/redux/action/actionFaciAdmin";
import { doGetFapho, doUploadFapho } from "@/redux/action/actionFaphoAdmin";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
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
  Image,
} from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillPicture } from "react-icons/ai";
import { ImUpload2 } from "react-icons/im";

import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

export default function Fapho() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const faphoHotel = useSelector((state: any) => state.FaphoReducer.fapho);
  const faphoOne = faphoHotel.filter((item: any) => item.fapho_faci_id == id);
  const faphoByOne = faphoHotel?.find((item: any) => item.fapho_faci_id == id);
  // reducer faci
  const faciHotel = useSelector(
    (state: any) => state.FaciAdminReducer.faciAdmin
  );
  const faciOne = faciHotel?.find((item: any) => item.faci_hotel_id == id);
  const [faciName, setFaciName] = useState("");
  const [faciDate, setFaciDate] = useState("");

  useEffect(() => {
    if (faciOne) {
      setFaciName(faciOne.faci_name);
      setFaciDate(faciOne.faci_modified_date);
    }
  }, [faciOne]);

  useEffect(() => {
    dispatch(doGetFapho());
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
      title: "fapho_faci_id",
      dataIndex: "fapho_faci_id",
      key: "fapho_faci_id",
    },
    {
      title: "photo",
      key: "gambar",
      render: (text: any, record: any) => (
        <Image
          src={record?.fapho_url}
          alt={record?.fapho_url}
          className="w-1/4"
        />
      ),
    },
    {
      title: "fapho_thumbnail_filename",
      dataIndex: "fapho_thumbnail_filename",
      key: "fapho_thumbnail_filename",
    },
    {
      title: "fapho_photo_filename",
      dataIndex: "fapho_photo_filename",
      key: "fapho_photo_filename",
    },
    {
      title: "fapho_photo_filename",
      dataIndex: "fapho_photo_filename",
      key: "fapho_photo_filename",
    },
    {
      title: "fapho_url",
      dataIndex: "fapho_url",
      key: "fapho_url",
    },
    {
      title: "fapho_modifield_date",
      key: "fapho_modifield_date",
      render: (text: any, record: any, index) => (
        <p className="w-32 text-xs">
          {dayjs(record.fapho_modifield_date).format("DD MMMM YYYY hh:mm:ss")}
        </p>
      ),
    },
  ];
  // modalinsert
  const [modal2Open, setModal2Open] = useState(false);

  const [dataUp, setDataUp] = useState(new FormData());
  console.log("data up", dataUp);
  const onUploadLogo = (e: any) => {
    const idFaci = faphoByOne?.fapho_faci_id;
    const img = e.target.files[0];
    // var img = e.target.files[0];
    let formData = new FormData();
    formData.append("file", img);
    formData.append("faphoFaci", idFaci);
    console.log("image check => ", img);
    console.log("id check => ", idFaci);
    console.log("formData check => ", formData);
    console.log("formData:", Object.fromEntries(formData.entries()));

    // dispatch(doUploadFapho(formData));
    setDataUp(formData);
  };
  //  save photo
  const addData = (e: any) => {
    e.preventDefault();
    dispatch(doUploadFapho(dataUp));
    setModal2Open(false);
  };

  // upload foto

  return (
    <div className="w-3/4 mx-auto text-center">
      <div className="flex justify-between py-3">
        <div className="flex justify-start space-x-3">
          <AiFillPicture className="text-2xl" />
          <span className="text-2xl font bold">{faciName}</span>
        </div>
        <span>{dayjs(faciDate).format("DD MMMM YYYY hh:mm:ss")}</span>
      </div>
      <hr className="text-gray-600 font-bold py-4" />
      <span className="text-base text-gray-300 flex justify-start">
        facility photo :
      </span>
      <div className="flex justify-end">
        {/* modal add data */}
        <>
          <Button
            className="bg-red-500 mb-5 flex justify-center px-3 py-2 items-center"
            type="primary"
            onClick={() => setModal2Open(true)}
          >
            <ImUpload2 />
            <p>upload</p>
          </Button>
          <Modal
            title="Upload Photo"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            footer={null}
          >
            <form action="" encType="multipart/form-data" method="POST">
              <label className="custom-file-upload">
                <input type="file" onChange={onUploadLogo} accept="image/*" />
              </label>
              <Button type="primary" className="bg-red-500" onClick={addData}>
                Save
              </Button>
            </form>
          </Modal>
        </>
        {/* end */}
      </div>
      <Table
        scroll={{ x: true }}
        size="small"
        dataSource={faphoOne}
        columns={columns}
      />
    </div>
  );
}

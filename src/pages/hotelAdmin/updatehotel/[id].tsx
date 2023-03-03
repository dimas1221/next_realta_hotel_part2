import {
  doHotelAdminReq,
  doUpdateHotel,
} from "@/redux/action/actionHotelAdmin";
import { Button, Form, Input, Radio } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type LayoutType = Parameters<typeof Form>[0]["layout"];
export default function udatehotel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { TextArea } = Input;

  const now = new Date();
  let dataHotel = useSelector(
    (state: any) => state.HotelAdminReducer.hotelAdmin
  );

  const [dataUpdate, setDataUpdate] = useState({
    hotelId: "",
    hotelName: "",
    hotelDescription: "",
    hotelRatingStar: 0,
    hotelPhonenumber: "",
    hotelModifiedDate: now.toISOString().substr(0, 10),
  });

  const [oneHotel, setOneHotel] = useState();

  useEffect(() => {
    dispatch(doHotelAdminReq());
    let hotel = dataHotel.find((item: any) => item.hotelId == id);
    setOneHotel(hotel);
  }, [id]);

  useEffect(() => {
    if (oneHotel) {
      setDataUpdate(oneHotel);
    }
  }, [oneHotel, id]);

  const eventHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setDataUpdate({ ...dataUpdate, [item]: event.target.value });
    };
  // button edit data
  const updateData = (e: any) => {
    e.preventDefault();
    dispatch(doUpdateHotel(dataUpdate));
    router.push("/hotelAdmin");
  };
  // end
  // form inputan
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? { wrapperCol: { span: 14, offset: 4 } }
      : null;
  // end
  return (
    <div className="w-3/4 mx-auto text-center mt-5 mb-5">
      <div className="text-2xl flex justify-start mt-5 mb-5">
        <span>Edit data Hotel</span>
      </div>
      {/* form */}
      <Form
        // {...formItemLayout}
        layout="vertical"
        // form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        style={{ maxWidth: 600 }}
        className="bg-white px-5 py-5"
      >
        <Form.Item label="hotel Name">
          <Input
            placeholder=""
            value={dataUpdate.hotelName}
            onChange={eventHandler("hotelName")}
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            placeholder=""
            value={dataUpdate.hotelDescription}
            onChange={eventHandler("hotelDescription")}
          />
        </Form.Item>
        <Form.Item label="hotel Rating Star">
          <Input
            placeholder=""
            type="number"
            min={0}
            value={dataUpdate.hotelRatingStar}
            onChange={eventHandler("hotelRatingStar")}
          />
        </Form.Item>
        <Form.Item label="hotel Phonenumber">
          <Input
            placeholder=""
            type="text"
            value={dataUpdate.hotelPhonenumber}
            onChange={eventHandler("hotelPhonenumber")}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="input placeholder"
            type="date"
            hidden
            value={dataUpdate.hotelModifiedDate}
            onChange={eventHandler("hotelModifiedDate")}
          />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button onClick={updateData} type="primary" className="bg-red-500">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* end */}
    </div>
  );
}

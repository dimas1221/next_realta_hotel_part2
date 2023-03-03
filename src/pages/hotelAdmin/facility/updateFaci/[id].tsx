import { doFaciAdminReq, doUpdateFaci } from "@/redux/action/actionFaciAdmin";
import { Button, Col, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function index() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const faci_hotel_id = useSelector(
    (state: any) => state.FaciAdminReducer.faciAdmin
  );
  // useEffect(() => {
  //   dispatch(doFaciAdminReq());
  // }, []);

  const [dataFaci, setDataFaci] = useState({
    faci_id: 0,
    faci_name: "",
    faci_description: "",
    faci_max_number: 0,
    faci_measure_unit: "",
    faci_room_number: "",
    faci_startdate: "",
    faci_endate: "",
    faci_low_price: "",
    faci_hight_price: "",
    faci_rate_price: "",
    faci_discount: "",
    faci_tax_rate: "",
    faci_modified_date: "",
    faci_cagro_id: 0,
    faci_hotel_id: 0,
  });
  console.log("datafaci", dataFaci);
  const [faci, setFaci] = useState();
  useEffect(() => {
    dispatch(doFaciAdminReq());
    let faciOne = faci_hotel_id.find((item: any) => item.faci_id == id);
    setFaci(faciOne);
  }, [id]);

  useEffect(() => {
    if (faci) {
      setDataFaci(faci);
    }
  }, [faci, id]);
  const handlerMunit = (value: any) => {
    setDataFaci({ ...dataFaci, faci_measure_unit: value });
  };
  const eventHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setDataFaci({ ...dataFaci, [item]: event.target.value });
    };
  // button insert data hotel
  // message require
  const [showError, setShowError] = useState({
    faci_name: false,
    faci_description: false,
    faci_max_number: false,
    faci_measure_unit: false,
    faci_room_number: false,
    faci_startdate: false,
    faci_endate: false,
    faci_low_price: false,
    faci_hight_price: false,
    faci_rate_price: false,
    faci_discount: false,
    faci_tax_rate: false,
    faci_cagro_id: false,
  });
  const [messageError, setMessageError] = useState({
    faci_name: "",
    faci_description: "",
    faci_max_number: "",
    faci_measure_unit: "",
    faci_room_number: "",
    faci_startdate: "",
    faci_endate: "",
    faci_low_price: "",
    faci_hight_price: "",
    faci_rate_price: "",
    faci_discount: "",
    faci_tax_rate: "",
    faci_cagro_id: "",
  });
  const updateFaci = (e: any) => {
    e.preventDefault();
    if (dataFaci.faci_name === "") {
      setShowError({ ...showError, faci_name: true });
      setMessageError({
        ...messageError,
        faci_name: "faci name must be filled!",
      });
      return;
    }
    if (dataFaci.faci_description === "") {
      setShowError({ ...showError, faci_description: true });
      setMessageError({
        ...messageError,
        faci_description: "faci description must be filled!",
      });
      return;
    }
    if (dataFaci.faci_max_number === 0) {
      setShowError({ ...showError, faci_max_number: true });
      setMessageError({
        ...messageError,
        faci_max_number: "faci max must be filled!",
      });
      return;
    }
    if (dataFaci.faci_measure_unit === "") {
      setShowError({ ...showError, faci_measure_unit: true });
      setMessageError({
        ...messageError,
        faci_measure_unit: "faci measure unit must be filled!",
      });
      return;
    }
    if (dataFaci.faci_startdate === "") {
      setShowError({ ...showError, faci_startdate: true });
      setMessageError({
        ...messageError,
        faci_startdate: "faci start date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faci_endate === "") {
      setShowError({ ...showError, faci_endate: true });
      setMessageError({
        ...messageError,
        faci_endate: "faci end date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faci_cagro_id === 0) {
      setShowError({ ...showError, faci_cagro_id: true });
      setMessageError({
        ...messageError,
        faci_cagro_id: "faci categori date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faci_hight_price === "") {
      setShowError({ ...showError, faci_hight_price: true });
      setMessageError({
        ...messageError,
        faci_hight_price: "faci hight price date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faci_low_price === "") {
      setShowError({ ...showError, faci_low_price: true });
      setMessageError({
        ...messageError,
        faci_low_price: "faci hight price date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faci_rate_price === "") {
      setShowError({ ...showError, faci_rate_price: true });
      setMessageError({
        ...messageError,
        faci_rate_price: "faci hight price date unit must be filled!",
      });
      return;
    }
    dispatch(doUpdateFaci(dataFaci));
    router.push("/hotelAdmin/facility/" + dataFaci.faci_hotel_id);
  };

  // buton back
  const back = (id: any) => {
    router.push("/hotelAdmin/facility/" + id);
  };

  // use effect membuat faci discount
  // diskon
  // const [disc, setDisc] = useState(0);
  // function handlerDisc(event: any) {
  //   setDisc(event.target.value);
  // }
  // // end
  // let hightPrice = dataFaci.faci_rate_price;
  // let IntHp = parseInt(hightPrice);
  // useEffect(() => {
  //   let totDiscount = IntHp * (disc / 100);
  //   let hasilDiscount = totDiscount.toString();
  //   setDataFaci({ ...dataFaci, faci_discount: hasilDiscount });
  // }, [dataFaci.faci_rate_price, disc]);
  //
  return (
    <div className="w-3/4 mx-auto text-center mt-5 mb-5">
      <div className="text-2xl flex justify-start mt-5 mb-5">
        <span>Edit data Facility</span>
      </div>
      {/* form */}
      <Form layout="vertical" className="bg-white p-6 rounded-lg">
        <Row className="flex justify-center">
          <Col span={10}>
            <Form.Item
              className=""
              label="faci_name"
              validateStatus={
                dataFaci.faci_name === "" && showError.faci_name ? "error" : ""
              }
              help={dataFaci.faci_name === "" ? messageError.faci_name : null}
            >
              <Input
                value={dataFaci.faci_name}
                onChange={eventHandler("faci_name")}
              />
            </Form.Item>

            <Form.Item
              className=""
              label="faci_max_number"
              validateStatus={
                dataFaci.faci_max_number === 0 && showError.faci_max_number
                  ? "error"
                  : ""
              }
              help={
                dataFaci.faci_max_number === 0
                  ? messageError.faci_max_number
                  : null
              }
            >
              <Input
                type="number"
                min={0}
                value={dataFaci.faci_max_number}
                onChange={eventHandler("faci_max_number")}
              />
            </Form.Item>
            <Form.Item
              className=""
              label="faci_measure_unit"
              validateStatus={
                dataFaci.faci_measure_unit === "" && showError.faci_measure_unit
                  ? "error"
                  : ""
              }
              help={
                dataFaci.faci_measure_unit === ""
                  ? messageError.faci_measure_unit
                  : null
              }
            >
              <Select
                onChange={handlerMunit}
                placeholder={dataFaci.faci_measure_unit}
              >
                <Select.Option value="people">people</Select.Option>
                <Select.Option value="beds">beds</Select.Option>
              </Select>
            </Form.Item>
            {/* <Form.Item
              className=""
              label="faci_cagro_id"
              name="faci_cagro_id"
              rules={[{ required: true }]}
              validateStatus={
                dataFaci.faci_cagro_id === 0 && showError.faci_cagro_id
                  ? "error"
                  : ""
              }
              help={
                dataFaci.faci_cagro_id === 0 ? messageError.faci_cagro_id : null
              }
            >
              <Input
                type="text"
                placeholder={dataFaci.faci_cagro_id.toString()}
                value={dataFaci.faci_cagro_id}
                onChange={eventHandler("faci_cagro_id")}
                readOnly
                className="bg-gray-100 font-bold text-gray-500"
              />
            </Form.Item> */}
            {/* <Form.Item className="" label="faci_room_number">
              <Input
                placeholder={dataFaci.faci_room_number}
                type="text"
                value={dataFaci.faci_room_number}
                onChange={eventHandler("faci_room_number")}
                readOnly
                className="bg-gray-100 font-bold text-gray-500"
              />
            </Form.Item> */}
            <Form.Item
              label="faci_startdate"
              validateStatus={
                dataFaci.faci_startdate === "" && showError.faci_startdate
                  ? "error"
                  : ""
              }
              help={
                dataFaci.faci_startdate === ""
                  ? messageError.faci_startdate
                  : null
              }
            >
              <Input
                type="date"
                value={dataFaci.faci_startdate}
                onChange={eventHandler("faci_startdate")}
              />
            </Form.Item>
            <Form.Item
              className=""
              label="faci_description"
              validateStatus={
                dataFaci.faci_description === "" && showError.faci_description
                  ? "error"
                  : ""
              }
              help={
                dataFaci.faci_description === ""
                  ? messageError.faci_description
                  : null
              }
            >
              <TextArea
                value={dataFaci.faci_description}
                onChange={eventHandler("faci_description")}
              />
            </Form.Item>
          </Col>
          <Col span={10} className="ml-5">
            <Form.Item
              className=""
              label="faci_endate"
              validateStatus={
                dataFaci.faci_endate === "" && showError.faci_endate
                  ? "error"
                  : ""
              }
              help={
                dataFaci.faci_endate === "" ? messageError.faci_endate : null
              }
            >
              <Input
                type="date"
                value={dataFaci.faci_endate}
                onChange={eventHandler("faci_endate")}
              />
            </Form.Item>
            <Form.Item
              className=""
              label="faci_hight_price"
              validateStatus={
                dataFaci.faci_hight_price === "" && showError.faci_hight_price
                  ? "error"
                  : ""
              }
              help={
                dataFaci.faci_hight_price === ""
                  ? messageError.faci_hight_price
                  : null
              }
            >
              <Input
                type="text"
                value={dataFaci.faci_hight_price}
                onChange={eventHandler("faci_hight_price")}
                suffix="$"
                min={0}
              />
            </Form.Item>
            <Form.Item
              className=""
              label="faci_low_price"
              validateStatus={
                dataFaci.faci_low_price === "" && showError.faci_low_price
                  ? "error"
                  : ""
              }
              help={
                dataFaci.faci_low_price === ""
                  ? messageError.faci_low_price
                  : null
              }
            >
              <Input
                type="text"
                value={dataFaci.faci_low_price}
                onChange={eventHandler("faci_low_price")}
                suffix="$"
                min={0}
              />
            </Form.Item>
            <Form.Item
              className=""
              label="faci_rate_price"
              validateStatus={
                dataFaci.faci_rate_price === "" && showError.faci_rate_price
                  ? "error"
                  : ""
              }
              help={
                dataFaci.faci_rate_price === ""
                  ? messageError.faci_rate_price
                  : null
              }
            >
              <Input
                type="text"
                value={dataFaci.faci_rate_price}
                onChange={eventHandler("faci_rate_price")}
                suffix="$"
                min={0}
              />
            </Form.Item>
            {/* <Form.Item className="" label="discount">
              <Input
                type="number"
                value={disc}
                onChange={handlerDisc}
                className="w-2/5"
                suffix="%"
                min={0}
                max={100}
              />
            </Form.Item> */}
            {/* <Form.Item className="" label="faci_discount">
              <Input
                placeholder={dataFaci.faci_discount}
                type="text"
                value={dataFaci.faci_discount}
                onChange={eventHandler("faci_discount")}
                readOnly
                className="bg-gray-100 font-bold text-gray-500"
                suffix="$"
              />
            </Form.Item> */}
            <Form.Item className="" label="faci_tax_rate">
              <Input
                type="text"
                value={dataFaci.faci_tax_rate}
                onChange={eventHandler("faci_tax_rate")}
                suffix="$"
                min={0}
              />
            </Form.Item>
            {/* <Form.Item className="faci_hotel_id" label="faciHotelId">
                <Input
                  value={dataFaci.faci_hotel_id}
                  onChange={eventHandler("faci_hotel_id")}
                  readOnly
                  className="text-base text-gray-500 font-bold bg-gray-100"
                />
              </Form.Item> */}

            {/*               
              <Input
                type="date"
                value={dataFaci.faci_modified_date}
                onChange={eventHandler("faci_modified_date")}
                readOnly
              /> */}
          </Col>
        </Row>
        <Row className="flex justify-between px-16">
          <Form.Item className="items-center">
            <Button type="primary" className="bg-red-500" onClick={updateFaci}>
              Submit
            </Button>
          </Form.Item>
          <Form.Item className="items-center">
            <Button
              type="primary"
              className="bg-red-500"
              onClick={() => back(dataFaci.faci_hotel_id)}
            >
              Cancel
            </Button>
          </Form.Item>
        </Row>
      </Form>
      {/* end */}
    </div>
  );
}

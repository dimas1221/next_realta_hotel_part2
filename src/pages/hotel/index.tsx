import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Carousel,
  Result,
} from "antd";
import { FileTextOutlined, StarOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doCardHotelReq } from "@/redux/action/actionHotel";
import { doAllFaciHotelReq } from "@/redux/action/actionFindFaciAllhotel";
import { doGetHore } from "@/redux/action/actionHore";

// modul booking
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
// modul booking

export default function index() {
  const { Meta } = Card;
  let root = useRouter();
  const { id } = root.query;
  const dispatch = useDispatch();
  // modul booking
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSpecial, setOpenspecial] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
    root.push("booking/orderdetail");
  };
  const handleOkspecial = () => {
    setOpenspecial(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  //end
  // reducer hotel
  let card = useSelector((state: any) => state.HotelReducer.hotel);
  let faci = useSelector((state: any) => state.FaciAllHotelReducer.facihotel);
  let horeData = useSelector((state: any) => state.HoreReducer.hore);

  const detail = faci.filter((item: any) => item.hotel_id == id);
  const oneHore = horeData.filter((item: any) => item.hore_hotel_id == id);
  // end
  // use effect hotel detail
  const [cardByOne, setCardByOne] = useState({
    hotel_id: 0,
    hotel_name: "",
    hotel_description: "",
    hotel_rating_star: 0,
    hotel_phonenumber: 0,
    faci_hotelall: "",
    url: "",
    place: "",
  });
  const [oneHotelCard, setOneHotelCard] = useState();
  useEffect(() => {
    dispatch(doCardHotelReq());
    dispatch(doGetHore());
    dispatch(doAllFaciHotelReq());
    let result = card.find((e: any) => e.hotel_id == id);
    setOneHotelCard(result);
  }, [id]);
  useEffect(() => {
    if (oneHotelCard) {
      setCardByOne(oneHotelCard);
    }
  }, [oneHotelCard, id]);
  // end

  let arr = cardByOne.url;
  let array = arr.split(",");
  return (
    <div className="md:container md:mx-auto">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div className="card2">
            {/* ini gambar */}
            <div className="m-5 mb-6">
              {/* <Slide {...zoomInProperties}>
                {array.map((each: any, index: React.Key | null | undefined) => (
                  <div
                    key={index}
                    className="flex justify-center w-full h-full"
                  > */}
              <img className="w-full " src={array[1]} alt="hotels" />
            </div>
            {/* ))}
              </Slide>
            </div> */}
            <div className="flex flex-wrap md:flex-no-wrap  justify-center gap-6 m-5 mb-">
              {array.map((image: any, index: any) => (
                <img key={index} src={image} className="w-1/4" />
              ))}
            </div>
            <div className="ml-5 mr-5 mb-5 flex flex-col gap-3">
              {/* badge */}
              <div className="flex  justify-between items-center">
                {/* hotle title */}
                <h2 className="hotel-title" title="Best Hotel Ever">
                  {cardByOne.hotel_name}
                </h2>
                <span className=" font-reguler">{cardByOne.place}</span>
              </div>
              <span className="flex items-center font-bold">
                <img
                  className="w-3 h-3 mr-1"
                  src="./img/strar.png"
                  alt="star"
                />
                {cardByOne.hotel_rating_star}
              </span>

              {/* action button */}
              <div className="mt-2 flex gap-2 items-center justify-between">
                <span className="text-sm font-medium ">
                  {cardByOne.hotel_phonenumber}
                </span>
              </div>
            </div>
          </div>
          {/* modul booking */}
          <>
            {/* <div className="flex flex-col rounded-lg bg-white shadow-lg  md:w-4/5 h-4/5 md:flex-row mb-3"> */}
            <Card
              title="Special Offer"
              extra={
                <a href="#" onClick={() => setOpenspecial(true)}>
                  More
                </a>
              }
            >
              <p className="font-bold">Promo Discount 120% </p>
              <p>
                Angkasa Pura Hotel dan maskapai bintang 5 "Garuda Indonesia"
                bekerjasama dalam program loyalti Concordia Lounge Potongan
                harga 20% bagi pemilik kartu member GarudaMiles tipe Blue &
                Silver Promo berlaku di Concordia Lounge seluruh Bandara PT
                Angkasa Pura I (Persero) Indonesia Promo berlaku mulai tanggal
                10 Agustus 2018 s.d 09 Februari 2019{" "}
              </p>
              <p>
                <br />
                *Syarat & ketentuan berlaku
              </p>
              <Button
                type="primary"
                onClick={() => setOpen(true)}
                className="bg-red-500 mt-3 "
              >
                Booking Now
              </Button>
            </Card>
            {/* </div> */}
            <Modal
              title="Booking Order"
              centered
              open={open}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancle
                </Button>,
                <Button
                  key="Booking"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  onClick={handleOk}
                  className="bg-yellow-300"
                >
                  Booking
                </Button>,
              ]}
              onCancel={() => setOpen(false)}
              width={500}
            >
              <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 700 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item label="Room" name="room">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Check-In"
                  name="CheckIn"
                  rules={[
                    { required: true, message: "Please input Check-In!" },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="Check-Out"
                  name="CheckOut"
                  rules={[
                    { required: true, message: "Please input Check-Out!" },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="Guest"
                  name="Guest"
                  rules={[{ required: true, message: "Please input Guest!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Price"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Order Extra"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Discount"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tax"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Subtotal"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>

            <Modal
              title="Booking Order"
              centered
              open={openSpecial}
              onCancel={() => setOpenspecial(false)}
              width={900}
              footer={null}
            >
              <button className="text-left" onClick={handleOkspecial}>
                <Card
                  title="Diskon Akhir Tahun"
                  bordered={false}
                  style={{ width: 850 }}
                >
                  {/* <p className='font-bold'>Promo Discount Akhirtahun 20% </p> */}
                  <p>
                    Angkasa Pura Hotel dan maskapai bintang 5 "Garuda Indonesia"
                    bekerjasama dalam program loyalti Concordia Lounge Potongan
                    harga 20% bagi pemilik kartu member GarudaMiles tipe Blue &
                    Silver{" "}
                  </p>
                  <p className="font-bold">
                    <br />
                    *Syarat & ketentuan berlaku
                  </p>
                </Card>
              </button>

              <button className="text-left " onClick={handleOkspecial}>
                <Card
                  title="Diskon Pengguna Baru"
                  bordered={false}
                  style={{ width: 850 }}
                >
                  {/* <p className='font-bold'>Promo Discount Akhirtahun 20% </p> */}
                  <p>
                    Angkasa Pura Hotel dan maskapai bintang 5 "Garuda Indonesia"
                    bekerjasama dalam program loyalti Concordia Lounge Potongan
                    harga 20% bagi pemilik kartu member GarudaMiles tipe Blue &
                    Silver
                  </p>
                  <p className="font-bold">
                    <br />
                    *Syarat & ketentuan berlaku
                  </p>
                </Card>
              </button>
            </Modal>
          </>
          {/* end */}
        </Col>
        <Col xs={24} md={12}>
          <div className="card2">
            <h1 className=" text-2xl text-center text-[#131828] ml-3 mr-3 mt-2">
              Description
            </h1>
            <hr className="w-10/12 h-1 mx-auto border-b-4 border-t-4 rounded-full bg-[#131828] mt-3 mb-3"></hr>
            <div className="w-10/12 mx-auto">
              <span className="ml-4 mt-3 mb-3 text-base text-[#131828] flex gap-2 text-justify">
                {cardByOne.hotel_description}
              </span>
            </div>
            <h1 className=" text-2xl text-center text-[#131828] ml-3 mr-3">
              Facility
            </h1>
            <hr className="w-10/12 h-1 mx-auto border-b-4 border-t-4 rounded-full bg-[#131828] mt-3 mb-3"></hr>
            <div className="w-10/12 mx-auto">
              <span className="ml-4 mt-3 mb-3 text-base text-[#131828] flex gap-2 text-justify">
                {cardByOne.faci_hotelall}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-no-wrap -mx-3 items-center gap-3 justify-center m-5">
            {detail &&
              detail.map((faci: any, i: any) => {
                let arr = faci.fapho_url;
                let array = arr.split(",");
                console.log("ab", array);
                return (
                  <Card hoverable style={{ width: 200 }} className="  w-4/12">
                    <Meta title={faci.faci_name} />
                    <Carousel autoplay>
                      {array.map((each: any, index: any) => (
                        <img
                          alt="ex"
                          src={each}
                          className="w-16 object-cover mb-3"
                        />
                      ))}
                    </Carousel>
                    <div className="flex justify-between mt-3">
                      <span>{faci.faci_discount}</span>
                      <button className="button-primary1">Action</button>
                    </div>
                  </Card>
                );
              })}
          </div>
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <Col span={24}>
          <div>
            <h2 className="bg-[#131828] text-white p-4 rounded-lg text-xl">
              Review user :
            </h2>
            {oneHore &&
              oneHore.map((hore: any, i: any) => {
                return (
                  <Card
                    className="mt-2 mb-1"
                    title={hore.user_full_name}
                    extra={
                      <img
                        alt="profil"
                        src="./img/profil.png"
                        style={{ width: 30 }}
                      />
                    }
                    style={{ width: "100%" }}
                  >
                    <div className="flex justify-between">
                      <Space>
                        <StarOutlined className="mb-2" />
                        <p>{hore.hore_rating}</p>
                      </Space>
                      <p>{hore.hore_created_on}</p>
                    </div>
                    <p>{hore.hore_user_review}</p>
                  </Card>
                );
              })}
          </div>
        </Col>
      </Row>
    </div>
  );
}

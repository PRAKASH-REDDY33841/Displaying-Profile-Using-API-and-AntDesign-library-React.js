import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LikeOutlined,
  LikeFilled,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const DisplayDetails = (props) => {
  const { eachProfileItem, getDeletionId, updateProfileDetails } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // local state for like toggle
  const [liked, setLiked] = useState(false);

  if (!eachProfileItem) {
    return (
      <Card
        style={{
          backgroundColor: "#000",
          color: "#fff",
          width: "40%",
          marginBottom: 16,
        }}
      >
        <div style={{ padding: 20, textAlign: "center" }}>
          Loading profile...
        </div>
      </Card>
    );
  }

  // Destructure user data
  const {
    id,
    name = "",
    username = "",
    email = "",
    phone = "",
    website = "",
    address = {},
    company = {},
  } = eachProfileItem;

  const { suite = "", street = "", city = "", zipcode = "", geo = {} } = address;
  const { lat = "", lng = "" } = geo;
  const { name: compName = "", catchPhrase = "", bs = "" } = company;

  const avatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${username}`;

  // Open modal and set form initial values
  const handleEdit = () => {
    form.setFieldsValue({ name, email, phone, website });
    setIsModalOpen(true);
  };

  // On modal save
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Build updated user object
        const updatedUser = {
          ...eachProfileItem, // include all original user data including id, address, company
          ...values,          // overwrite editable fields
        };

        updateProfileDetails(updatedUser); // Notify parent to update state
        setIsModalOpen(false);             // Close modal
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Delete user callback
  const onDeleteButton = () => {
    getDeletionId(id);
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: "#000",
          color: "#fff",
          marginBottom: 16,
          marginRight: 16,
        }}
        title={
          <Row gutter={16} align="middle">
            <Col>
              <img
                src={avatarUrl}
                alt={`${username}'s avatar`}
                style={{ width: 60, height: 60, borderRadius: "50%" }}
                onError={(e) => {
                  e.target.src =
                    "https://api.dicebear.com/9.x/lorelei/svg?seed=placeholder";
                }}
              />
            </Col>
            <Col>
              <Title level={4} style={{ color: "#fff" }}>
                {name}
              </Title>
              <Text type="secondary" style={{ color: "#bbb" }}>
                @{username}
              </Text>
            </Col>
          </Row>
        }
        actions={[
          <Button
            type="text"
            icon={liked ? <LikeFilled style={{ color: "red" }} /> : <LikeOutlined />}
            onClick={() => setLiked(!liked)}
            key="like"
          />,
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit} key="edit" />,
          <Button type="text" icon={<DeleteOutlined />} danger onClick={onDeleteButton} key="delete" />,
        ]}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Text strong style={{ color: "#fff" }}>
              Email:
            </Text>{" "}
            <span style={{ color: "#fff" }}>{email}</span>
            <br />
            <Text strong style={{ color: "#fff" }}>
              Phone:
            </Text>{" "}
            <span style={{ color: "#fff" }}>{phone}</span>
            <br />
            <Text strong style={{ color: "#fff" }}>
              Website:
            </Text>{" "}
            <span style={{ color: "#fff" }}>{website}</span>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong style={{ color: "#fff" }}>
              📍 Address
            </Text>
            <br />
            <span style={{ color: "#fff" }}>
              {suite}, {street}, {zipcode}, {city}
            </span>
            <br />
            <span style={{ color: "#fff" }}>
              Lat: {lat}, Lng: {lng}
            </span>
          </Col>
        </Row>

        <hr style={{ margin: "16px 0", borderColor: "#444" }} />

        <Text strong style={{ color: "#fff" }}>
          ⚙️ Company
        </Text>
        <br />
        <Text style={{ color: "#fff" }}>Name: {compName}</Text>
        <br />
        <Text style={{ color: "#fff" }}>Catch Phrase: {catchPhrase}</Text>
        <br />
        <Text style={{ color: "#fff" }}>BS: {bs}</Text>
      </Card>

      {/* Modal for editing */}
      <Modal
        title="Edit User Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical" initialValues={{ name, email, phone, website }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Please enter a valid email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DisplayDetails;

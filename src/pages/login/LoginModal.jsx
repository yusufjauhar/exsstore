import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Modal, PasswordInput, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

const LoginModal = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(isLogin);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: { email: "", password: "" },

    validate: {
      email: (value) => (/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/.test(value) ? null : "Email tidak valid."),
      password: (value) => (value.length < 4 ? "Password minimal 4 karakter." : null),
    },
  });

  const handleSubmit = async (val) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        new URLSearchParams({
          email: val.email,
          password: val.password,
        })
      );

      showNotification({
        message: `${data.message}`,
        styles: (theme) => ({
          root: {
            backgroundColor: "#1f9ca4",
            borderColor: "#1f9ca4",

            "&::before": { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            "&:hover": { backgroundColor: theme.colors.red[7] },
          },
        }),
      });
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      setLoading(false);
      setIsLogin(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.message);
    }
  };
  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(setIsLogin(false))}
        title="Silahkan Login"
        overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <form onSubmit={form.onSubmit((val) => handleSubmit(val))}>
          <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps("email")} />
          <PasswordInput label="Password" placeholder="Password" {...form.getInputProps("password")} />
          <Button type="submit" mt="sm" loading={loading} style={{ backgroundColor: "#1f9ca4" }}>
            Login
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default LoginModal;

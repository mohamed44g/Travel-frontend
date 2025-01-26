"use client";

import React, { useState } from "react";
import { Box, Container, IconButton, Paper } from "@mui/material";
import {
  Apps as AppsIcon,
  Person as PersonIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";

const ProfileForm = React.lazy(() => import("./components/profile-form"));
const AppsSection = React.lazy(() => import("./components/apps-section"));
const MessagesSection = React.lazy(
  () => import("./components/messages-section")
);

type TabSection = "apps" | "history" | "profile" | "messages" | "settings";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<TabSection>("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "apps":
        return <AppsSection />;
      case "profile":
        return <ProfileForm />;
      case "messages":
        return <MessagesSection />;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        height: "100%",
        bgcolor: "background.default",
      }}
    >
      {/* Sidebar */}
      <Paper
        elevation={0}
        sx={{
          width: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          pt: 5,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <IconButton
          color={activeTab === "profile" ? "primary" : "default"}
          onClick={() => setActiveTab("profile")}
          sx={{
            transition: "all 0.2s",
            bgcolor:
              activeTab === "profile" ? "action.selected" : "transparent",
          }}
        >
          <PersonIcon />
        </IconButton>
        <IconButton
          color={activeTab === "apps" ? "primary" : "default"}
          onClick={() => setActiveTab("apps")}
          sx={{
            transition: "all 0.2s",
            bgcolor: activeTab === "apps" ? "action.selected" : "transparent",
          }}
        >
          <AppsIcon />
        </IconButton>
        <IconButton
          color={activeTab === "messages" ? "primary" : "default"}
          onClick={() => setActiveTab("messages")}
          sx={{
            transition: "all 0.2s",
            bgcolor:
              activeTab === "messages" ? "action.selected" : "transparent",
          }}
        >
          <ChatIcon />
        </IconButton>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="md">{renderContent()}</Container>
    </Box>
  );
}

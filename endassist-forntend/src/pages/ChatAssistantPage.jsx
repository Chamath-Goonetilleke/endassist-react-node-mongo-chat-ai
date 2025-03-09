import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Box,
  Paper,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";


const ChatCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: '100%',
  maxHeight: "100vh",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
}));

const ChatHeader = styled(CardHeader)(({ theme }) => ({
  borderBottom: 0,
  backgroundColor: "#DDCEFF",
}));

const MessageArea = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 4,
  },
}));

const ChatFooter = styled(CardActions)(({ theme }) => ({
  borderRadius: "0 0 15px 15px",
  borderTop: 0,
  padding: theme.spacing(1, 2),
}));

const MessageInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {},
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  color:"#DDCEFF",
  borderRadius: "50%",
  marginLeft: theme.spacing(1),
}));

const UserMessage = styled(Paper)(({ theme }) => ({
  backgroundColor: "#DDCEFF",
  padding: theme.spacing(1, 2),
  borderRadius: 25,
  maxWidth: "70%",
  position: "relative",
  marginBottom: theme.spacing(3),
  alignSelf: "flex-end",
}));

const BotMessage = styled(Paper)(({ theme }) => ({
  backgroundColor: "#D9D9D9",
  padding: theme.spacing(1, 2),
  borderRadius: 25,
  maxWidth: "70%",
  position: "relative",
  marginBottom: theme.spacing(3),
  alignSelf: "flex-start",
}));

const MessageTime = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: -20,
  fontSize: 10,
  color: "rgba(255, 255, 255, 0.5)",
}));

const UserMessageTime = styled(MessageTime)({
  right: 10,
  color: "black",
});

const BotMessageTime = styled(MessageTime)({
  left: 10,
  color:"black"
});

const StatusBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#4cd137",
    color: "#4cd137",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

// Main component
const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const now = new Date();
    const time = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Add user message
    setMessages([...messages, { text: input, sender: "user", time }]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        text: "I'm a medical chatbot. How can I help you today?",
        sender: "bot",
        time,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInput("");
  };

  return (
    <Box>
      <Grid item xs={12} md={8} lg={6}>
        <ChatCard>
          <ChatHeader
            avatar={
              <StatusBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src="https://cdn-icons-png.flaticon.com/512/387/387569.png" />
              </StatusBadge>
            }
            title={<Typography variant="h6">Diagnosis Support</Typography>}
            subheader={
              <Typography variant="body2">Ask me anything!</Typography>
            }
          />

          <MessageArea>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {messages.map((message, index) =>
                message.sender === "user" ? (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 1,
                    }}
                  >
                    <UserMessage elevation={0}>
                      {message.text}
                      <UserMessageTime variant="caption">
                        {message.time}
                      </UserMessageTime>
                    </UserMessage>
                  </Box>
                ) : (
                  <Box
                    key={index}
                    sx={{ display: "flex", mb: 3, alignItems: "center" }}
                  >
                    <Avatar
                      src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
                      sx={{
                        width: 40,
                        height: 40,
                        mr: 1,
                        alignSelf: "flex-end",
                      }}
                    />
                    <BotMessage elevation={0}>
                      {message.text}
                      <BotMessageTime variant="caption">
                        {message.time}
                      </BotMessageTime>
                    </BotMessage>
                  </Box>
                )
              )}
              <div ref={messagesEndRef} />
            </Box>
          </MessageArea>

          <ChatFooter>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", width: "100%" }}
            >
              <MessageInput
                fullWidth
                placeholder="Type your message..."
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
              />
              <SendButton type="submit">
                <SendIcon sx={{color:"#DDCEFF"}} />
              </SendButton>
            </form>
          </ChatFooter>
        </ChatCard>
      </Grid>
    </Box>
  );
};

export default ChatAssistant;

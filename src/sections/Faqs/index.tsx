import Title from "../../compenant/Title";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Container,
  Box,
} from "@mui/material";

import "./index.scss";

export default function index() {
  const faqs = [
    {
      question: "How do I book a trip?",
      answer:
        "You can book a trip directly on our website by selecting your desired destination and preferred dates. Click the 'Book Now' button and follow the instructions to complete your reservation.",
    },
    {
      question: "What is included in the travel packages?",
      answer:
        "Our travel packages typically include accommodation, transportation, guided tours, and some meals. Specific details are provided in the description of each package.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule your booking. Cancellation and rescheduling policies vary depending on the trip. Please refer to the policy section on the trip page or contact our support team for assistance.",
    },
    {
      question: "Do you offer group discounts?",
      answer:
        "Yes, we offer discounts for group bookings. Please contact us with the number of travelers and preferred destination for more details.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and PayPal. If you need alternative payment options, please get in touch with us.",
    },
    {
      question: "Are the trips suitable for children and families?",
      answer:
        "Most of our trips are family-friendly. Each trip page provides information about age recommendations. If you’re unsure, feel free to reach out to us.",
    },

  ];
  return (
    <>
      <Title title="FAQs question" />
      <Container sx={{ mt: 10 }}>
        <Box className="FAQs">
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </>
  );
}

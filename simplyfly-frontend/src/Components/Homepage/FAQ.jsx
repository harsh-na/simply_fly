import React, { useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f5f5f5",
                padding: "40px 20px",
                textAlign: "center",
            }}
        >
            {/* FAQ Section Header */}
            <Typography variant="h4" component="h2" gutterBottom>
                Frequently Asked Questions
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "30px", color: "#555" }}>
                Have questions? We’ve got answers! Explore our FAQ section to find quick solutions to common queries.
            </Typography>

            {/* FAQ Accordion */}
            <Box sx={{ maxWidth: "800px", margin: "0 auto" }}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">How do I book a flight?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2" color="textSecondary">
                            To book a flight, simply search for your desired destination and travel dates, select your preferred flight, and proceed to checkout. Our user-friendly interface makes it quick and easy!
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Can I cancel or reschedule my booking?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2" color="textSecondary">
                            Yes, you can cancel or reschedule your booking through the "My Bookings" section on our platform. Note that cancellation and rescheduling policies may vary by airline.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Is my payment information secure?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2" color="textSecondary">
                            Absolutely! We use advanced encryption technology to ensure your payment details are safe and secure.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">What should I do if I encounter an issue?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2" color="textSecondary">
                            If you face any issues, our customer support team is available 24/7 to assist you. Feel free to contact us via phone, email, or live chat.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">What baggage policies should I know about?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2" color="textSecondary">
                            Baggage policies differ by airline. After booking your flight, you'll receive detailed baggage information based on the airline's rules for carry-on and checked luggage.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Are there any discounts for group bookings?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2" color="textSecondary">
                            Yes, we offer group booking discounts! If you're booking for a group of 10 or more, you may be eligible for special rates. Please contact our support team for more details.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};

export default FAQ;
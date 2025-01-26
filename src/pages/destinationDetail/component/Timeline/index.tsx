import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { List, ListItem, Typography } from "@mui/material";
import { Suspense } from "react";
import Loader from "../../../../compenant/Loader";

export default function NoOppositeContent({ day }: { day: number }) {
  return (
    <Suspense fallback={<Loader />}>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {Array.from({ length: day }, (_, index) => index + 1).map(
          (item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                Day {item} - Departure
                <Typography variant="body1" sx={{ m: 2 }}>
                  Donec quam felis, ultricies nec, pellentesque eu, pretium
                  quis, sem. Nulla consequat massa quis enim. Donec pede justo.
                </Typography>
                <List>
                  <ListItem sx={{ color: "text.secondary" }}>
                    5 Star Accommodation
                  </ListItem>
                  <ListItem sx={{ color: "text.secondary" }}>
                    Breakfast
                  </ListItem>
                  <ListItem sx={{ color: "text.secondary" }}>Lunsh</ListItem>
                </List>
              </TimelineContent>
            </TimelineItem>
          )
        )}
      </Timeline>
    </Suspense>
  );
}

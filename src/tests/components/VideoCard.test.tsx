import { render, screen } from "@testing-library/react";
import VideoCard from "../../components/VideoCard";

describe("Video Component Unit tests", () => {
  // Dummy schema of the videoInfo
  const mockData = {
    id: "1",
    title: "Understanding JavaScript Closures",
    description: "A deep dive into closures in JavaScript.",
    url: "https://www.example.com/video1",
    thumbnail: "https://picsum.photos/377/200?random=1",
    authorId: "1",
    views: 1200,
    createdAt: "2023-05-01T10:00:00Z",
  };
  test("renders title thumbnail and views from props", () => {
    const dummyRender = render(<VideoCard videoInfo={mockData} />);
    // check if title is rendered
    expect(screen.findByText(mockData.title)).toBeInTheDocument();
  });
});

import AboutPage from "@/app/(page)/about/page";
import AboutLayout from "@/app/(page)/about/layout";
import { render, screen } from "@testing-library/react";

describe("About Page", () => {
  it("should render the about page", () => {
    const page = render(
      <AboutLayout>
        <AboutPage />
      </AboutLayout>
    );
    expect(page).toMatchSnapshot();
  });
});

// Page.test.js
import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';

describe('Page Component', () => {
    test('renders the main heading', () => {
        render(<Page />);
        const headingElement = screen.getByText(/Yared Bitewlign/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders the subheading', () => {
        render(<Page />);
        const subheadingElement = screen.getByText(/Web And App developer/i);
        expect(subheadingElement).toBeInTheDocument();
    });

    test('renders the About link', () => {
        render(<Page />);
        const aboutLink = screen.getByText(/About/i);
        expect(aboutLink).toBeInTheDocument();
    });

    test('renders the Skills link', () => {
        render(<Page />);
        const skillsSection = screen.getByTestId('skills-section');
        expect(skillsSection).toBeInTheDocument();
    });

    test('renders the Projects link', () => {
        render(<Page />);
        const projectsSection = screen.getByTestId('project-section');
        expect(projectsSection).toBeInTheDocument();
    });

    test('renders Frontend skills section', () => {
        render(<Page />);
        const frontendSection = screen.getByTestId('frontend-section');
        expect(frontendSection).toBeInTheDocument();
    });

    test('renders Backend skills section', () => {
        render(<Page />);
        const backendSection = screen.getByTestId('backend-section');
        expect(backendSection).toBeInTheDocument();
    });

    test('renders Other Skills section', () => {
        render(<Page />);
        const otherSkillsHeading = screen.getByText(/Other Skills/i);
        expect(otherSkillsHeading).toBeInTheDocument();
    });

    test('renders all front-end skills with descriptions', () => {
        render(<Page />);
        const reactDesc = screen.getByText(/I specialize in React.js/i);
        const nextDesc = screen.getByText(/I’m proficient in Next.js/i);
        const reactNativeDesc = screen.getByText(/I have expertise in React Native/i);

        expect(reactDesc).toBeInTheDocument();
        expect(nextDesc).toBeInTheDocument();
        expect(reactNativeDesc).toBeInTheDocument();
    });

    test('renders all back-end skills with descriptions', () => {
        render(<Page />);
        const nodeDesc = screen.getByText(/I have solid experience with Node.js/i);
        const expressDesc = screen.getByText(/I'm proficient in Express.js/i);
        const mongodbDesc = screen.getByText(/I specialize in MongoDB/i);
        const hygraphDesc = screen.getByText(/I’m skilled in using Hygraph/i);
        const graphqlDesc = screen.getByText(/I have expertise in GraphQL/i);

        expect(nodeDesc).toBeInTheDocument();
        expect(expressDesc).toBeInTheDocument();
        expect(mongodbDesc).toBeInTheDocument();
        expect(hygraphDesc).toBeInTheDocument();
        expect(graphqlDesc).toBeInTheDocument();
    });
});

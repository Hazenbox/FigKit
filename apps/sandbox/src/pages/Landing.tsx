import { Link } from 'react-router-dom';
import { Button } from '@figkit/ui';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-container">
        <div className="landing-content">
          <h1 className="landing-title">FigKit Design System</h1>
          <p className="landing-description">
            A comprehensive design system with React components, design tokens, and Figma integration
          </p>
          
          <div className="landing-ctas">
            <Link to="/storybook" className="landing-cta-link">
              <Button variant="primary" size="large" className="landing-cta">
                View Storybook
              </Button>
            </Link>
            <Link to="/test-npm" className="landing-cta-link">
              <Button variant="secondary" size="large" className="landing-cta">
                Test NPM Package
              </Button>
            </Link>
            <Link to="/performance" className="landing-cta-link">
              <Button variant="secondary" size="large" className="landing-cta">
                Performance Benchmarks
              </Button>
            </Link>
            <a 
              href="/docs" 
              className="landing-cta-link"
            >
              <Button variant="secondary" size="large" className="landing-cta">
                Documentation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


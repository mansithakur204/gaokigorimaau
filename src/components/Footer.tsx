import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Portal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/search" className="hover:text-primary transition-colors">Search Schemes</Link></li>
              <li><Link to="/home" className="hover:text-primary transition-colors">All Schemes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/category/Farmers" className="hover:text-primary transition-colors">Farmers</Link></li>
              <li><Link to="/category/Students" className="hover:text-primary transition-colors">Students</Link></li>
              <li><Link to="/category/Women" className="hover:text-primary transition-colors">Women</Link></li>
              <li><Link to="/category/General" className="hover:text-primary transition-colors">General</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Data Sources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">india.gov.in</a></li>
              <li><a href="https://myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">myscheme.gov.in</a></li>
              <li><a href="https://pmjdy.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">pmjdy.gov.in</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rural Services Portal. For informational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}

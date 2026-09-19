import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { withBasePath } from "@/lib/site-paths";

export function AboutFooter() {
  return (
    <footer data-footer-tone="dark" className="about-reference-footer">
        <div className="about-reference-footer__main">
          <div className="about-reference-footer__brand">
            <Link href="/" className="about-reference-footer__brand-link">
              <span className="about-reference-footer__logo">
                <Image
                  src={withBasePath("/images/d4v-logo-exact.png")}
                  alt="D4V Bay Area logo"
                  fill
                  loading="eager"
                  sizes="72px"
                />
              </span>
              <span className="about-reference-footer__wordmark">
                <strong>D4V</strong> Bay Area
              </span>
            </Link>
            <p>
              Empowering our community.
              <br />
              Protecting what matters.
            </p>
            <div className="about-reference-footer__social" aria-label="D4V Bay Area social channels">
              <span title="Instagram" aria-hidden="true">ig</span>
              <span title="Facebook" aria-hidden="true">f</span>
              <span title="LinkedIn" aria-hidden="true">in</span>
            </div>
          </div>

          <nav aria-label="Explore">
            <h2>Explore</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/our-work">Our Work</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/get-involved">Get Involved</Link></li>
              <li><Link href="/get-help">Get Help</Link></li>
            </ul>
          </nav>

          <nav aria-label="Programs">
            <h2>Programs</h2>
            <ul>
              <li><Link href="/workshops">Scam Workshops</Link></li>
              <li><Link href="/seniorsafe">SeniorSafe</Link></li>
            </ul>
          </nav>

          <div className="about-reference-footer__connect">
            <h2>Connect</h2>
            <a href="mailto:info@d4vbayarea.org">
              <Mail aria-hidden="true" />
              <span>info@d4vbayarea.org</span>
            </a>
            <p>
              <MapPin aria-hidden="true" />
              <span>Bay Area, California</span>
            </p>
          </div>

          <p className="about-reference-footer__summary">
            D4V Bay Area is a student-led initiative dedicated to preventing
            online fraud through education and community collaboration.
          </p>
        </div>

        <div className="about-reference-footer__bottom">
          <span>© 2025 D4V Bay Area. All rights reserved.</span>
          <span>Privacy Policy&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;Disclaimer</span>
          <span>Educational Use Only</span>
        </div>

        <svg className="about-reference-footer__skyline" viewBox="0 0 420 80" aria-hidden="true">
          <path d="M2 77H418M116 77V52h16v25m-12-25V35l4-8 4 8v17m-4-25V14m21 63V58h13v19m15 0V43h18v34m7 0V61h12v16m17 0V49h19v28m-14-28V36m33 41V57h15v20m14 0V45l22-14 22 14v32m-16-35v35m-19-18h32m19 18V52h18v25m-9-25V36m28 41V60h17v17" />
          <path d="M0 77c30-4 58-3 87 0m220 0c37-5 75-5 112 0" />
        </svg>
    </footer>
  );
}

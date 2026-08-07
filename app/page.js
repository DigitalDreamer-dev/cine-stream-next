import Link from "next/link";

export default function Landing() {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <h1>JuzzWatch</h1>

        <div className="nav-right">
          <button className="language-btn">English</button>

          <Link href="/browse" className="signin-btn">
            Let&apos;s Go
          </Link>
        </div>
      </nav>

      <div className="landing-hero">
        <h1>
          Unlimited movies,
          <br />
          shows and more
        </h1>

        <h3>Discover thousands of movies instantly.</h3>

        <p>Search • Save Favorites • AI Mood Matcher</p>

        <Link href="/browse" className="landing-btn">
          Let&apos;s Go →
        </Link>
      </div>
    </main>
  );
}

import { dimensions } from "../data/dimensions";

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <section className="hero-card">
      <div className="hero-layout">
        <div className="hero-main">
          <p className="hero-kicker">Programmer Personality Test</p>
          <h1>程序员人格测试</h1>
          <p className="hero-copy">一个有趣的程序员人格测试。</p>
          <p className="hero-note">
            从 AI 依赖、架构洁癖、排错玄学，到你到底是技术理想主义者还是准点下班派，
            这套测试会给你一个很像真的答案。
          </p>
          <button className="hero-button" type="button" onClick={onStart}>
            开始测试
          </button>
        </div>

        <div className="hero-visual">
          <img
            alt="Programmer personality cast illustration"
            className="hero-cast-image"
            src="/hero/intro-cast.png"
          />
        </div>
      </div>

      <div className="hero-dimensions">
        {dimensions.map((dimension) => (
          <article key={dimension.id} className="hero-dimension-card">
            <p className="hero-dimension-kicker">
              {dimension.name} / {dimension.label}
            </p>
            <h2>
              {dimension.leftPole.label} vs {dimension.rightPole.label}
            </h2>
            <p>{dimension.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

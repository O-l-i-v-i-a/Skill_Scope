export default function SkillScopeLanding() {
  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-500/20 blur-3xl rounded-full" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 relative z-10">
        <div>
          <h1 className="text-3xl font-black tracking-wide bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            SkillScope
          </h1>
        </div>

        <button
          onClick={goToDashboard}
          className="px-5 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition duration-300"
        >
          Open Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 max-w-5xl shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 mb-6">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-sm text-cyan-300 tracking-wide">
              Job Market Intelligence
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Discover
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Future Skills
            </span>
            <br />
            Before Everyone Else
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Track real-time job market demand, analyze trending technologies,
            identify skill gaps, and explore the most valuable career paths
            using real-time data-driven insights.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <button
              onClick={goToDashboard}
              className="px-8 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 shadow-xl shadow-cyan-500/20"
            >
              Launch Dashboard
            </button>

            
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-300 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-3xl mb-6">
              📈
            </div>
            <h3 className="text-2xl font-bold mb-4">Skill Trends</h3>
            <p className="text-gray-400 leading-relaxed">
              Discover the fastest-growing technologies and monitor demand
              changes across software engineering, AI, cloud, and data science.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-300 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-3xl mb-6">
              🎯
            </div>
            <h3 className="text-2xl font-bold mb-4">Skill Gap Analysis</h3>
            <p className="text-gray-400 leading-relaxed">
              Compare your current skills against industry demand and identify
              what you need to learn next.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-300 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-3xl mb-6">
              🚀
            </div>
            <h3 className="text-2xl font-bold mb-4">Career Intelligence</h3>
            <p className="text-gray-400 leading-relaxed">
              Analyze real-world job postings and uncover the most in-demand technologies and roles.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-8 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["10K+", "Jobs Analyzed"],
            ["250+", "Skills Tracked"],
            ["40+", "Tech Roles"],
            ["Live", "Market Insights"],
          ].map(([num, label]) => (
            <div
              key={label}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {num}
              </h2>
              <p className="text-gray-400 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-12">
          <h2 className="text-4xl font-black mb-5">
            Start Building Your Future Today
          </h2>

          <p className="text-gray-300 text-lg mb-8">
            The tech industry evolves fast. Stay ahead with data-driven career
            insights and smart skill recommendations.
          </p>

          <button
            onClick={goToDashboard}
            className="px-10 py-4 rounded-2xl text-lg font-bold bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition duration-300 shadow-2xl shadow-purple-500/20"
          >
            Enter SkillScope
          </button>
        </div>
      </section>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { FaPlay, FaSearch } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🎨",
      title: "Drag & Drop Builder",
      description:
        "Intuitive form building with drag-and-drop interface for all field types.",
    },
    {
      icon: "📱",
      title: "Multi-step Forms",
      description:
        "Create complex forms with multiple steps and progress tracking.",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description:
        "Preview and optimize forms for desktop, tablet, and mobile devices.",
    },
    {
      icon: "🔗",
      title: "Easy Sharing",
      description:
        "Generate shareable links for your forms with real-time form filling.",
    },
    {
      icon: "⚡",
      title: "Real-time Preview",
      description:
        "See changes instantly as you build your forms with live preview.",
    },
    {
      icon: "📊",
      title: "Form Analytics",
      description: "Track form submissions and analyze user interactions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* hero section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Build Beautiful Forms{" "}
              <span className="text-blue-600">Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Create stunning, responsive forms with our intuitive drag-and-drop
              builder. From simple contact forms to complex multi-step surveys,
              build it all with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/builder")}
                className="text-lg px-8 py-4"
              >
                <FaPlay size={22} color="white" />{" "}
                <span className="pl-2 font-serif"> Start Building</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/demo")}
                className="text-lg px-8 py-4"
              >
                <FaSearch /> <span className="pl-2">View Demo</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* features section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Build Amazing Forms
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make form building fast, intuitive,
              and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your First Form?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already building amazing forms with
            FormCraft.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/builder")}
            className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100"
          >
            Start Building Now →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

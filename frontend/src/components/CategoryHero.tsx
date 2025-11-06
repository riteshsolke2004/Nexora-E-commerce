import { Sparkles } from 'lucide-react';

interface CategoryHeroProps {
  title: string;
  description: string;
  icon?: string;
}

const CategoryHero = ({ title, description, icon }: CategoryHeroProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mb-8">
      <div className="container">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            {icon && <span className="text-5xl">{icon}</span>}
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-2">
              <Sparkles className="h-8 w-8" />
              {title}
            </h1>
          </div>
          <p className="text-lg text-blue-100">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;

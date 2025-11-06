import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  Heart,
  Zap,
  Users,
  Award,
  TrendingUp,
  Shield,
  Headphones,
  Globe,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Active Customers', value: '500K+', icon: Users },
    { label: 'Products Listed', value: '100K+', icon: TrendingUp },
    { label: 'Daily Orders', value: '50K+', icon: Zap },
    { label: 'Countries Served', value: '50+', icon: Globe },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize our customers and their satisfaction above all else',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every product is verified for quality and authenticity',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support ready to help',
    },
  ];

  const team = [
    // {
    //   name: 'John Smith',
    //   role: 'Founder & CEO',
    //   bio: 'Visionary entrepreneur with 15+ years in e-commerce',
    //   image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    // },
    // {
    //   name: 'Sarah Johnson',
    //   role: 'COO',
    //   bio: 'Operations expert ensuring seamless service delivery',
    //   image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    // },
    // {
    //   name: 'Mike Chen',
    //   role: 'CTO',
    //   bio: 'Tech innovator building next-gen e-commerce solutions',
    //   image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    // },
    // {
    //   name: 'Emily Davis',
    //   role: 'Head of Customer Success',
    //   bio: 'Customer advocate ensuring exceptional experiences',
    //   image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    // },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
              <Sparkles className="h-10 w-10" />
              About Vibe Commerce
            </h1>
            <p className="text-xl text-blue-100">
              Your trusted destination for quality products at unbeatable prices
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16 space-y-20">
        {/* Our Story */}
        <section className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Founded in 2020, Vibe Commerce started with a simple mission: to make quality
              products accessible to everyone, everywhere. What began as a small startup has
              evolved into a leading e-commerce platform serving customers across 50+ countries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">How We Started</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our journey began when our founder noticed a gap in the online retail space.
                Customers wanted variety, quality, and fair prices all in one place. We built
                Vibe Commerce to bridge that gap.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we partner with thousands of verified sellers and brands to bring you
                the best products from around the world.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge>Innovation</Badge>
                <Badge>Quality</Badge>
                <Badge>Trust</Badge>
                <Badge>Reliability</Badge>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 h-80 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                alt="About Vibe Commerce"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Our Mission & Vision */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold text-center">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="pt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To empower millions of people worldwide by providing them access to a wide
                  variety of products at competitive prices, backed by exceptional customer
                  service and a seamless shopping experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="pt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To become the world's most trusted and customer-centric e-commerce platform,
                  revolutionizing how people shop online through technology, innovation, and
                  sustainable practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Card key={i} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="pt-6 space-y-3 text-center">
                    <Icon className="h-10 w-10 text-blue-600 mx-auto" />
                    <h3 className="font-bold text-lg">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Team */}
        <section className="space-y-8">
          {/* <h2 className="text-4xl font-bold text-center">Meet Our Team</h2> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="pt-6 text-center space-y-2">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-sm font-medium text-blue-600">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold text-center">Why Choose Vibe Commerce?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <Award className="h-8 w-8 text-blue-600" />
                <h3 className="font-bold text-lg">Verified Sellers</h3>
                <p className="text-muted-foreground">
                  All sellers are verified and reviewed by our team to ensure authenticity
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <h3 className="font-bold text-lg">Best Prices</h3>
                <p className="text-muted-foreground">
                  Competitive pricing with regular offers and discounts on thousands of items
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <Shield className="h-8 w-8 text-purple-600" />
                <h3 className="font-bold text-lg">Buyer Protection</h3>
                <p className="text-muted-foreground">
                  100% secure transactions and money-back guarantee on all purchases
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12 text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Experience the Difference?</h2>
          <p className="text-xl text-blue-100">
            Join millions of satisfied customers shopping on Vibe Commerce today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

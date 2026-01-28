import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely fantastic service! The technician arrived on time, was professional, and solved our problem quickly. Highly recommend!",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "I've used their services multiple times and they never disappoint. Quality work at fair prices. They're my go-to for all service needs.",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      text: "Emergency service on a Sunday and they came right away! Fixed the issue and even gave me tips for maintenance. Outstanding!",
      date: "3 weeks ago",
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="relative">
              <CardContent className="pt-6">
                <Quote className="h-10 w-10 text-primary/20 mb-4" />
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-slate-900">{review.name}</p>
                  <p className="text-sm text-slate-500">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-4 rounded-full shadow-lg">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-slate-900">5.0</span>
            <span className="text-slate-600">from 100+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}

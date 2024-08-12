import { formatCurrency } from "@/lib/formatters";

import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";

export default function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
}) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Image
          src={`/${imagePath}`}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>

      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />

      <CardHeader>
        <CardTitle>
          <div className="w-3/4  rounded-full bg-gray-300 h-6" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 rounded-full bg-gray-300 h-4" />
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="w-full rounded-full bg-gray-300 h-4" />
        <div className="w-full rounded-full bg-gray-300 h-4" />
        <div className="w-3/4 rounded-full bg-gray-300 h-4" />
      </CardContent>

      <CardFooter>
        <Button size="lg" className="w-full" disabled>
          Loading...
        </Button>
      </CardFooter>
    </Card>
  );
}

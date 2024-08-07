'use client';
import { Card, CardBody, Image, Button, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { HeartIcon } from "@/public/icons/HeartIcon";
import { CartPlus } from "@/public/icons/CartPlus";
import { Money } from "@/public/icons/Money";
import ColorSelector from '@/components/selectors/ColorSelector';
import SizeSelector from '@/components/selectors/SizeSelector';

export default function ProductDetailsCard({ result }) {
  const producto = result.sync_product;
  const variantes = result.sync_variants;

  console.log(result);
  console.log(variantes);

  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariante, setSelectedVariante] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(selectedVariante);

  const availableColors = [...new Set(variantes.map(variant => variant.color))];
  const filteredColors = availableColors.filter(color => color !== null);

  const availableSizes = [...new Set(variantes.map(variant => variant.size))];
  const filteredSizes = availableSizes.filter(size => size !== null);

  useEffect(() => {
    if (variantes.length > 0) {
      setSelectedSize(variantes[0].size);
      setSelectedColor(variantes[0].color);
      setSelectedVariante(variantes[0]);
      setLoading(false);
    } else {
      setSelectedSize(null);
      setSelectedColor(null);
      setSelectedVariante(null);
    }
  }, [variantes]);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const nuevaVariante = variantes.find(variante => variante.color === selectedColor && variante.size === selectedSize);
      setSelectedVariante(nuevaVariante || null);
    }
  }, [selectedColor, selectedSize, variantes]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };



  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-100 my-6"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-8 md:col-span-6">
            <Skeleton isLoaded={!loading} className="rounded-lg">
              <Image
                alt="Album cover"
                className="object-cover"
                height={800}
                shadow="md"
                src={selectedVariante && selectedVariante.files[1].preview_url}
                width="100%"
              />
            </Skeleton>
            <Skeleton isLoaded={!loading} className="rounded-lg">
              <ColorSelector onSelect={handleColorSelect} colors={filteredColors}></ColorSelector>
            </Skeleton>
          </div>

          <div className="flex flex-col col-span-4 md:col-span-6 h-full justify-between p-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-6 ">
                <Skeleton isLoaded={!loading} className="rounded-lg ">
                  <h1 className=" text-4xl font-bold ">{producto.name}</h1>
                </Skeleton>
                <Skeleton isLoaded={!loading} className="rounded-lg ">
                  <p className="text-2xl text-semibold ">{selectedVariante && selectedVariante.retail_price} €</p>
                </Skeleton>
              </div>

              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Skeleton isLoaded={!loading} className="rounded-lg">

                <SizeSelector onSelect={handleSizeSelect} sizes={filteredSizes}></SizeSelector>
              </Skeleton>
            </div>
            <div className="flex gap-8 items-center ">
              <Button
                radius="full"
                className="snipcart-add-item bg-gradient-to-tr from-blue-500 to-sky-400 text-white shadow-lg gap-4 hover:scale-110"
                endContent={<CartPlus />}
                data-item-id={selectedVariante && selectedVariante.id}
                data-item-price={selectedVariante && selectedVariante.retail_price}
                //data-item-url={`/productos/${producto.id}`}
                data-item-description={selectedVariante && selectedVariante.name}
                data-item-image={selectedVariante && selectedVariante.files[1].thumbnail_url}
                data-item-name={selectedVariante && selectedVariante.name}
              >
                Add to Cart
              </Button>
              <Button
                radius="full"
                className="bg-gradient-to-tr from-emerald-500 to-teal-300 hover:scale-110 text-white shadow-lg gap-2"
                endContent={<Money />}
              >
                Buy
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

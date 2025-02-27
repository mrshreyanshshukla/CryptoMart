"use client";

import { useDrag } from "react-dnd";
import Image from "next/image";
import millify from "millify";
import { useRouter } from "next/navigation";

export default function DraggableCoin({ coin }) {
  const router = useRouter();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'coin',
    item: { id: coin.uuid, name: coin.name, image: coin.iconUrl },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <tr
      key={coin.uuid}
      ref={drag}
      onClick={() => router.push(`/coin/${coin.uuid}`)}
      className="cursor-pointer hover:coin_hover_shadow transition-all hover:bg-slate-900 hover:rounded-xl"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            width={30}
            height={30}
            src={coin.iconUrl}
            alt={coin.name}
            className="inline-block mr-2"
          />
          <span className="font-bold">{coin.name}</span>
        </div>
      </td>
      <td className="px-6 py-4">${millify(coin.price)}</td>
      <td className="px-6 py-4">${millify(coin.marketCap)}</td>
      <td className="px-6 py-4">{coin.change}%</td>
      <td className="px-6 py-4">{coin.symbol}</td>
      <td className="px-6 py-4">{coin.rank}</td>
    </tr>
  );
}

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const CHARGING_FEATURES = [
  {
    title: '스스로 돌보며',
    desc: '이동이 끝나면 자동으로 충전 스테이션에 복귀하여 무선 충전을 시작합니다.',
    image: '/images/charger-1.png',
  },
  {
    title: '혼자일 땐',
    desc: '유휴 시간에는 자동으로 충전 위치에서 대기하며 에너지를 보충합니다.',
    image: '/images/charger-seat.png',
  },
  {
    title: '모두를 위해',
    desc: '기존 가로등 인프라를 활용한 무선 충전 시스템으로 별도 시설 없이 충전 가능합니다.',
    image: '/images/charger-2.png',
  },
];

export function ChargingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.charge-title', {
      scrollTrigger: { trigger: '.charge-title', start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8,
    });

    gsap.from('.charge-main-image', {
      scrollTrigger: { trigger: '.charge-main-image', start: 'top 80%' },
      scale: 0.95, opacity: 0, duration: 0.8,
    });

    gsap.from('.charge-card', {
      scrollTrigger: { trigger: '.charge-cards', start: 'top 80%' },
      y: 40, opacity: 0, stagger: 0.2, duration: 0.7,
    });

    gsap.from('.charge-wireless', {
      scrollTrigger: { trigger: '.charge-wireless', start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.7,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Label */}
        <p className="text-xs font-medium text-[var(--color-label-gray)] mb-2">
          Charge-in
        </p>

        {/* Title */}
        <h2 className="charge-title text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
          충전은 가로등 옆 어디서나
        </h2>

        {/* Main charger image */}
        <div className="charge-main-image mt-8 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
          <Image
            src="/images/charger-main.png"
            alt="가로등 무선 충전 시스템"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>

        {/* Feature cards */}
        <div className="charge-cards mt-12 space-y-8">
          {CHARGING_FEATURES.map((feature) => (
            <div key={feature.title} className="charge-card flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-48 shrink-0 relative aspect-video md:aspect-square rounded-xl overflow-hidden bg-[var(--color-bg-subtle)]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text)]">{feature.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Wireless charging */}
        <div className="charge-wireless mt-16">
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
            충전은 무선으로
          </h3>
          <div className="mt-6 relative aspect-video rounded-2xl overflow-hidden bg-[var(--color-bg-subtle)]">
            <Image
              src="/images/bus-stop.png"
              alt="무선 충전 인프라"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

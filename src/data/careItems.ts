export type CareItem = {
  id: string;
  icon: string;
  title: string;
  text: string;
};

export const careItems: CareItem[] = [
  {
    id: "handwash",
    icon: "/images/care/handwash.svg",
    title: "Ручне прання",
    text: "Періть вручну в прохолодній воді без сильного тертя.",
  },
  {
    id: "delicate-remedy",
    icon: "/images/care/delecate_remedy.svg",
    title: "Делікатний засіб",
    text: "Використовуйте м’який засіб для вовни та делікатних тканин.",
  },
  {
    id: "do-not-twist",
    icon: "/images/care/do_not_twist.svg",
    title: "Не викручуйте",
    text: "Не викручуйте виріб, акуратно відтисніть його рушником.",
  },
  {
    id: "not-high-temperature",
    icon: "/images/care/not_high_temperatura.svg",
    title: "Уникайте високих температур",
    text: "Не сушіть біля батареї та під прямим сонцем.",
  },
  {
    id: "delicate-mode",
    icon: "/images/care/deliacate_mode.svg",
    title: "Делікатний режим",
    text: "Якщо перете в машинці, обирайте делікатний режим.",
  },
  {
    id: "dry-horizontally",
    icon: "/images/care/dry_horizontally.svg",
    title: "Сушіть горизонтально",
    text: "Розкладіть виріб на рівній поверхні.",
  },
];

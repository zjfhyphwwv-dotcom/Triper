"""Destination data for Kamchatka travel application."""
from __future__ import annotations

from dataclasses import dataclass
from typing import List


@dataclass(frozen=True)
class Destination:
    """Represents a popular travel destination on the Kamchatka Peninsula."""

    name: str
    description: str
    activities: List[str]


DESTINATIONS: List[Destination] = [
    Destination(
        name="Долина гейзеров",
        description=(
            "Одно из крупнейших скоплений гейзеров в мире, расположенное в"
            " Кроноцком заповеднике. Посетители наблюдают регулярные"
            " выбросы горячей воды и пара в окружении сочной зелени и"
            " вулканических пейзажей."
        ),
        activities=[
            "вертолётная экскурсия",
            "наблюдение геотермальных явлений",
            "фотосъёмка природных ландшафтов",
        ],
    ),
    Destination(
        name="Мутновский вулкан",
        description=(
            "Активный вулкан с впечатляющими фумарольными полями,"
            " кратером и ледниками. Тропа к вершине проходит через"
            " каньоны и паровые источники, открывая панорамные виды"
            " на сопки Камчатки."
        ),
        activities=[
            "трекинг",
            "наблюдение вулканической активности",
            "посещение ледников",
        ],
    ),
    Destination(
        name="Курильское озеро",
        description=(
            "Знаменитое озеро на юге Камчатки, где в летний сезон можно"
            " наблюдать бурых медведей, ловящих нерку. Пейзаж дополняют"
            " величественные вулканы и дикая природа."
        ),
        activities=[
            "фотосафари",
            "наблюдение за медведями",
            "прогулки на лодке",
        ],
    ),
    Destination(
        name="Авачинская бухта",
        description=(
            "Живописная бухта, одна из крупнейших в мире, рядом с"
            " Петропавловском-Камчатским. Популярна морскими круизами"
            " с видами на скалы «Три брата», морских птиц и сивучей."
        ),
        activities=[
            "морская прогулка",
            "наблюдение за морскими животными",
            "фотосъёмка",
        ],
    ),
    Destination(
        name="Вилючинский водопад",
        description=(
            "Высокий водопад на склоне Вилючинского вулкана, окружённый"
            " мхами и цветами. Летом сюда приходят для пикников и купания"
            " в тёплых природных источниках поблизости."
        ),
        activities=[
            "легкий трекинг",
            "пикник",
            "посещение горячих источников",
        ],
    ),
]


def get_destinations() -> List[Destination]:
    """Return the list of popular Kamchatka destinations."""

    return DESTINATIONS.copy()


if __name__ == "__main__":
    for destination in get_destinations():
        print(f"{destination.name}: {destination.description}")
        print("Доступные активности: " + ", ".join(destination.activities))
        print()

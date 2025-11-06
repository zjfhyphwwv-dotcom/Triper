"""Командный интерфейс для просмотра направлений Triper."""

import argparse
import json
from typing import Any, Dict, List, Optional

from . import find_destination, load_kamchatka_destinations


def _print_destination(data: Dict[str, Any]) -> None:
    print(data["name"])
    print("=" * len(data["name"]))
    print(f"Категория: {data['category']}")
    print(f"Лучшее время: {data['bestSeason']}")
    if data.get("highlights"):
        print("Главные впечатления:")
        for highlight in data["highlights"]:
            print(f"  • {highlight}")
    print(f"Описание: {data['shortDescription']}")
    coords = data.get("coordinates")
    if coords:
        print(f"Координаты: {coords['lat']}, {coords['lon']}")


def main(argv: Optional[List[str]] = None) -> None:
    parser = argparse.ArgumentParser(
        prog="triper",
        description="Показывает популярные направления на Камчатке"
    )
    parser.add_argument(
        "name",
        nargs="?",
        help="Название направления для подробной информации"
    )
    args = parser.parse_args(argv)

    if args.name:
        destination = find_destination(args.name)
        if not destination:
            parser.error("Направление не найдено. Используйте без аргументов для списка.")
        _print_destination(destination)
        return

    destinations = load_kamchatka_destinations()
    print(json.dumps(destinations, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

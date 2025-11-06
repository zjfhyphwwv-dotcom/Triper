"""Простое приложение Triper для работы с направлениями."""
from importlib import resources
import json
from typing import List, Dict, Optional

_DATA_PACKAGE = __name__ + ".data"
_DATA_FILE = "kamchatka_destinations.json"


def load_kamchatka_destinations() -> List[Dict[str, object]]:
    """Возвращает список популярных направлений на Камчатке."""
    with resources.open_text(_DATA_PACKAGE, _DATA_FILE, encoding="utf-8") as fh:
        return json.load(fh)


def find_destination(name: str) -> Optional[Dict[str, object]]:
    """Ищет направление по названию без учета регистра."""
    normalized = name.casefold()
    for destination in load_kamchatka_destinations():
        if destination["name"].casefold() == normalized:
            return destination
    return None


__all__ = ["load_kamchatka_destinations", "find_destination"]

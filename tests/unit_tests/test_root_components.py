import unittest

from promptop import __all__


class TestRootComponent(unittest.TestCase):
    def test_root_components(self) -> None:
        assert __all__ == sorted(
            [
                "OpenAIApiHandler",
                "OpenAIModel",
                "PipeContainer",
                "RepoID",
            ]
        ), "root public component is changed. please make sure it's intended."

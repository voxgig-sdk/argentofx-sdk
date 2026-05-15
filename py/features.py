# Argentofx SDK feature factory

from feature.base_feature import ArgentofxBaseFeature
from feature.test_feature import ArgentofxTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ArgentofxBaseFeature(),
        "test": lambda: ArgentofxTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()

# ProjectName SDK exists test

import pytest
from argentofx_sdk import ArgentofxSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ArgentofxSDK.test(None, None)
        assert testsdk is not None

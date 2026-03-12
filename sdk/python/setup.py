from setuptools import setup

setup(
    name="mohini",
    version="0.1.0",
    description="Official Python client for the Mohini Agent OS REST API",
    py_modules=["mohini_sdk", "mohini_client"],
    python_requires=">=3.8",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
)

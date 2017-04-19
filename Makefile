NODE_BIN := $(shell npm bin)
OUT := out
ABS_C_BUILD := $(OUT)/component-build
SRC := lib

all: build

build: $(ABS_C_BUILD)/build.js

clean:
	rm -rf $(OUT)/*

$(ABS_C_BUILD)/build.js: $(OUT)/client.js component.json
	$(NODE_BIN)/component-build --out $(ABS_C_BUILD)

$(OUT)/client.js: $(SRC)/client.js
	$(NODE_BIN)/babel --out-file $@ $<

.PHONY: all clean	

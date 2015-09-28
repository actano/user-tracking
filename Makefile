NODE_BIN := $(shell npm bin)
OUT := out
ABS_C_BUILD := $(OUT)/component-build
SRC := lib

all: build

build: $(ABS_C_BUILD)/build.js

clean:
	rm -rf $(OUT)

$(ABS_C_BUILD)/build.js: $(OUT)/client.js component.json
	$(NODE_BIN)/component-build --out $(ABS_C_BUILD)

$(OUT)/client.js: $(SRC)/client.coffee
	$(NODE_BIN)/coffee --compile --output $(@D) $<

.PHONY: all clean	

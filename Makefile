define print_error
      @tput setaf 1
      @echo $1
      @tput sgr0
endef


all:
	$(call print_error, "Tienes que especificar algún comando.")

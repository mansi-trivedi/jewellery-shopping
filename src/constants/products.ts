const products = [
  {
    SKU: "P001",
    description: "Gold Necklace with Diamonds",
    stock: 15,
    price: 2500,
    categoryId: "D1B9E8A1-9B4A-4D8F-97F2-78A8A0C9B30E",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P002",
    description: "Silver Bracelet with Charms",
    stock: 30,
    price: 800,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjC45LPz4aLAxWXRP8BHbBSGwAYABALGgJtZA&ae=2&aspm=1&co=1&ase=5&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdZtuQMKe5FszNvxduyC-c7tmzYtwH1qERliztw09NrzvJ-YAikPEAaAi-jEALw_wcB&ohost=www.google.com&cid=CAESVuD2gLdnFmRoN_n9yMue1-aKLeHwxJ8JvsvOh6i0cEl293RnT3De4wbSZECYLwz_vOXLhueXZiLAEoprUbM6Xy0SYxgMa37aFPT1pjdRLHPMxnNZAqTI&sig=AOD64_1CVlvlEq9f0eeCRLFstZ61uHqEqg&ctype=5&q=&ved=2ahUKEwj8247Pz4aLAxWohIkEHYh5Eu8Qwg8oAXoECAcQPA&adurl=",
  },
  {
    SKU: "P003",
    description: "Platinum Ring with Sapphire",
    stock: 10,
    price: 3200,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P004",
    description: "Diamond Earrings in Rose Gold",
    stock: 20,
    price: 4200,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fearring&psig=AOvVaw3DhNKxiJbpXPrzgMyDvZwB&ust=1737542036360000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCF8OzOhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P005",
    description: "Gold Pendant with Ruby",
    stock: 12,
    price: 3600,
    categoryId: "76E0F0A0-5B22-4D7C-9A49-5A38F56E77F2",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mannash.in%2Fproducts%2Fblossom-circle-rose-gold-plated-sterling-silver-pendant&psig=AOvVaw05L-eNLMzkgyiya_S96why&ust=1737542534340000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjBpMLQhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P006",
    description: "Luxury Silver Watch",
    stock: 25,
    price: 2000,
    categoryId: "92E4DA6F-C5F0-4C16-97DB-CF1E8E1DA0BB",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.carlington.in%2Fproducts%2Fcarlington-silver-analog-watchct-2014-silver&psig=AOvVaw1uHQdnMSbTZJUQ4911IJim&ust=1737542629504000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMiGquvQhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P007",
    description: "Charm Anklet in Gold",
    stock: 18,
    price: 600,
    categoryId: "C2F9B7D6-6F77-4F25-9C0B-9A5F09C4D292",
    image:
      "https://www.google.com/imgres?q=anklet%20for%20girls&imgurl=https%3A%2F%2Frukminim2.flixcart.com%2Fimage%2F850%2F1000%2Fl23mhzk0%2Fanklet%2Fz%2Fr%2Fl%2Fna-na-1-208-naksh-original-imagdgrehuf6rjf5.jpeg%3Fq%3D20%26crop%3Dfalse&imgrefurl=https%3A%2F%2Fwww.flipkart.com%2Fnaksh-nakshstylish-design-anklets-girls-women-s-alloy-anklet-silver%2Fp%2Fitm6db778612286e%3Fpid%3DANKGDGRFVCSSYBRN&docid=XQzP3NWdGsJcjM&tbnid=gE1UD4K5TvEZCM&vet=12ahUKEwiT-YWd0YaLAxVznokEHa6hHucQM3oFCIABEAA..i&w=800&h=1000&hcb=2&ved=2ahUKEwiT-YWd0YaLAxVznokEHa6hHucQM3oFCIABEAA",
  },
  {
    SKU: "P008",
    description: "Cufflinks with Onyx Stone",
    stock: 15,
    price: 1200,
    categoryId: "A6D1C7F8-8A75-4E8E-8A7F-8A9E35A68F9E",
    image:
      "https://www.google.com/imgres?q=Cufflinks&imgurl=https%3A%2F%2Ffrenchcrown.in%2Fcdn%2Fshop%2Fproducts%2FCL39-_5.jpg%3Fcrop%3Dcenter%26height%3D1200%26v%3D1700656959%26width%3D1200&imgrefurl=https%3A%2F%2Ffrenchcrown.in%2Fproducts%2Fsilver-with-brown-diamond-shaped-stone-cufflinks-b&docid=iGCAg0lsFTNVvM&tbnid=9SzhyRRDlyyWiM&vet=12ahUKEwiFnN210YaLAxUQv4kEHaTUJ0cQM3oECFMQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwiFnN210YaLAxUQv4kEHaTUJ0cQM3oECFMQAA",
  },
  {
    SKU: "P009",
    description: "Women's Diamond Engagement Ring",
    stock: 8,
    price: 5000,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P010",
    description: "Men's Platinum Watch",
    stock: 10,
    price: 7500,
    categoryId: "E1B9D4C3-1A74-4571-9D9B-67A399B3F98A",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.carlington.in%2Fproducts%2Fcarlington-silver-analog-watchct-2014-silver&psig=AOvVaw1uHQdnMSbTZJUQ4911IJim&ust=1737542629504000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMiGquvQhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P011",
    description: "Silver Necklace with Gemstones",
    stock: 22,
    price: 1200,
    categoryId: "D1B9E8A1-9B4A-4D8F-97F2-78A8A0C9B30E",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P012",
    description: "Rose Gold Bracelet with Pearls",
    stock: 25,
    price: 350,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjC45LPz4aLAxWXRP8BHbBSGwAYABALGgJtZA&ae=2&aspm=1&co=1&ase=5&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdZtuQMKe5FszNvxduyC-c7tmzYtwH1qERliztw09NrzvJ-YAikPEAaAi-jEALw_wcB&ohost=www.google.com&cid=CAESVuD2gLdnFmRoN_n9yMue1-aKLeHwxJ8JvsvOh6i0cEl293RnT3De4wbSZECYLwz_vOXLhueXZiLAEoprUbM6Xy0SYxgMa37aFPT1pjdRLHPMxnNZAqTI&sig=AOD64_1CVlvlEq9f0eeCRLFstZ61uHqEqg&ctype=5&q=&ved=2ahUKEwj8247Pz4aLAxWohIkEHYh5Eu8Qwg8oAXoECAcQPA&adurl=",
  },
  {
    SKU: "P013",
    description: "Gold Hoop Earrings",
    stock: 20,
    price: 800,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fearring&psig=AOvVaw3DhNKxiJbpXPrzgMyDvZwB&ust=1737542036360000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCF8OzOhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P014",
    description: "Diamond Pendant on Gold Chain",
    stock: 18,
    price: 4500,
    categoryId: "76E0F0A0-5B22-4D7C-9A49-5A38F56E77F2",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mannash.in%2Fproducts%2Fblossom-circle-rose-gold-plated-sterling-silver-pendant&psig=AOvVaw05L-eNLMzkgyiya_S96why&ust=1737542534340000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjBpMLQhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P015",
    description: "Gold Plated Chain Necklace",
    stock: 22,
    price: 950,
    categoryId: "B1B8E7C9-B28C-4B72-A14B-5F0B589C4787",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P016",
    description: "Men's Black Leather Bracelet",
    stock: 50,
    price: 150,
    categoryId: "A6D1C7F8-8A75-4E8E-8A7F-8A9E35A68F9E",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjC45LPz4aLAxWXRP8BHbBSGwAYABALGgJtZA&ae=2&aspm=1&co=1&ase=5&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdZtuQMKe5FszNvxduyC-c7tmzYtwH1qERliztw09NrzvJ-YAikPEAaAi-jEALw_wcB&ohost=www.google.com&cid=CAESVuD2gLdnFmRoN_n9yMue1-aKLeHwxJ8JvsvOh6i0cEl293RnT3De4wbSZECYLwz_vOXLhueXZiLAEoprUbM6Xy0SYxgMa37aFPT1pjdRLHPMxnNZAqTI&sig=AOD64_1CVlvlEq9f0eeCRLFstZ61uHqEqg&ctype=5&q=&ved=2ahUKEwj8247Pz4aLAxWohIkEHYh5Eu8Qwg8oAXoECAcQPA&adurl=",
  },
  {
    SKU: "P017",
    description: "Women's Sapphire Ring in White Gold",
    stock: 10,
    price: 3200,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P018",
    description: "Gold Ring with Diamond and Ruby",
    stock: 5,
    price: 5500,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P019",
    description: "Ruby Pendant Necklace",
    stock: 12,
    price: 2700,
    categoryId: "D1B9E8A1-9B4A-4D8F-97F2-78A8A0C9B30E",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P020",
    description: "Gold Stud Earrings",
    stock: 30,
    price: 500,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fearring&psig=AOvVaw3DhNKxiJbpXPrzgMyDvZwB&ust=1737542036360000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCF8OzOhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P021",
    description: "Silver Charm Bracelet",
    stock: 25,
    price: 600,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjC45LPz4aLAxWXRP8BHbBSGwAYABALGgJtZA&ae=2&aspm=1&co=1&ase=5&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdZtuQMKe5FszNvxduyC-c7tmzYtwH1qERliztw09NrzvJ-YAikPEAaAi-jEALw_wcB&ohost=www.google.com&cid=CAESVuD2gLdnFmRoN_n9yMue1-aKLeHwxJ8JvsvOh6i0cEl293RnT3De4wbSZECYLwz_vOXLhueXZiLAEoprUbM6Xy0SYxgMa37aFPT1pjdRLHPMxnNZAqTI&sig=AOD64_1CVlvlEq9f0eeCRLFstZ61uHqEqg&ctype=5&q=&ved=2ahUKEwj8247Pz4aLAxWohIkEHYh5Eu8Qwg8oAXoECAcQPA&adurl=",
  },
  {
    SKU: "P022",
    description: "Men's Titanium Wedding Band",
    stock: 18,
    price: 900,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://www.google.com/imgres?q=mens%20band&imgurl=https%3A%2F%2Fwww.candere.com%2Fmedia%2Fjewellery%2Fimages%2Fgr00071_1_1.jpg&imgrefurl=https%3A%2F%2Fwww.candere.com%2Forlando-gold-wedding-band-for-him.html&docid=8ztnaLERGH08PM&tbnid=mBZdeZlMcJYttM&vet=12ahUKEwiHqb_L0YaLAxVCjIkEHbOtD5kQM3oECBkQAA..i&w=900&h=900&hcb=2&ved=2ahUKEwiHqb_L0YaLAxVCjIkEHbOtD5kQM3oECBkQAA",
  },
  {
    SKU: "P023",
    description: "Emerald Gold Ring",
    stock: 8,
    price: 4800,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P024",
    description: "Diamond Studded Gold Bracelet",
    stock: 20,
    price: 3200,
    categoryId: "76E0F0A0-5B22-4D7C-9A49-5A38F56E77F2",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjC45LPz4aLAxWXRP8BHbBSGwAYABALGgJtZA&ae=2&aspm=1&co=1&ase=5&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdZtuQMKe5FszNvxduyC-c7tmzYtwH1qERliztw09NrzvJ-YAikPEAaAi-jEALw_wcB&ohost=www.google.com&cid=CAESVuD2gLdnFmRoN_n9yMue1-aKLeHwxJ8JvsvOh6i0cEl293RnT3De4wbSZECYLwz_vOXLhueXZiLAEoprUbM6Xy0SYxgMa37aFPT1pjdRLHPMxnNZAqTI&sig=AOD64_1CVlvlEq9f0eeCRLFstZ61uHqEqg&ctype=5&q=&ved=2ahUKEwj8247Pz4aLAxWohIkEHYh5Eu8Qwg8oAXoECAcQPA&adurl=",
  },
  {
    SKU: "P025",
    description: "Gold Watch with Leather Strap",
    stock: 10,
    price: 4500,
    categoryId: "E1B9D4C3-1A74-4571-9D9B-67A399B3F98A",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.carlington.in%2Fproducts%2Fcarlington-silver-analog-watchct-2014-silver&psig=AOvVaw1uHQdnMSbTZJUQ4911IJim&ust=1737542629504000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMiGquvQhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P026",
    description: "Rose Gold Necklace with Opal",
    stock: 7,
    price: 3500,
    categoryId: "D1B9E8A1-9B4A-4D8F-97F2-78A8A0C9B30E",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P027",
    description: "Silver Toe Ring Set",
    stock: 40,
    price: 200,
    categoryId: "A6D1C7F8-8A75-4E8E-8A7F-8A9E35A68F9E",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P028",
    description: "Platinum Chain Necklace",
    stock: 14,
    price: 3700,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P029",
    description: "Diamond Chandelier Earrings",
    stock: 10,
    price: 5200,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fearring&psig=AOvVaw3DhNKxiJbpXPrzgMyDvZwB&ust=1737542036360000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCF8OzOhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P030",
    description: "Gold Ring with Engraved Patterns",
    stock: 22,
    price: 1200,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P031",
    description: "Multi-Gemstone Bracelet",
    stock: 12,
    price: 2100,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjC45LPz4aLAxWXRP8BHbBSGwAYABALGgJtZA&ae=2&aspm=1&co=1&ase=5&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdZtuQMKe5FszNvxduyC-c7tmzYtwH1qERliztw09NrzvJ-YAikPEAaAi-jEALw_wcB&ohost=www.google.com&cid=CAESVuD2gLdnFmRoN_n9yMue1-aKLeHwxJ8JvsvOh6i0cEl293RnT3De4wbSZECYLwz_vOXLhueXZiLAEoprUbM6Xy0SYxgMa37aFPT1pjdRLHPMxnNZAqTI&sig=AOD64_1CVlvlEq9f0eeCRLFstZ61uHqEqg&ctype=5&q=&ved=2ahUKEwj8247Pz4aLAxWohIkEHYh5Eu8Qwg8oAXoECAcQPA&adurl=",
  },
  {
    SKU: "P032",
    description: "Diamond Watch with Gold Chain",
    stock: 5,
    price: 8500,
    categoryId: "E1B9D4C3-1A74-4571-9D9B-67A399B3F98A",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.carlington.in%2Fproducts%2Fcarlington-silver-analog-watchct-2014-silver&psig=AOvVaw1uHQdnMSbTZJUQ4911IJim&ust=1737542629504000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMiGquvQhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P033",
    description: "Pearl Drop Earrings",
    stock: 18,
    price: 1200,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fearring&psig=AOvVaw3DhNKxiJbpXPrzgMyDvZwB&ust=1737542036360000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCF8OzOhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P034",
    description: "Amethyst Gold Ring",
    stock: 9,
    price: 4400,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjsztugz4aLAxXrSf8BHcp_J5QYABAFGgJtZA&co=1&ase=2&gclid=Cj0KCQiAqL28BhCrARIsACYJvkdsFvWnqMQeFS7TlMi3UgswrB0IvDUAT95IHOzORtFsVP5sJhop-8YaApe2EALw_wcB&ohost=www.google.com&cid=CAESVuD2DkXTbIigaPim1P2_o1-zbscIEOJLM-uw87Sdw9e7EBVsdmTTxIp9WnWkXgOfcIKdyVMzkNrrDtGpm66mzUHp2pFjwa-yrYVUWS35J1dj5l4A_bNP&sig=AOD64_1Gl_OAUh1-bH4j-a_0Bmkl7UPeUw&ctype=5&q=&nis=4&ved=2ahUKEwimltegz4aLAxVDm4kEHU3HOzEQwg8oAXoECAoQHQ&adurl=",
  },
  {
    SKU: "P035",
    description: "Men's Black Onyx Pendant",
    stock: 13,
    price: 1600,
    categoryId: "A6D1C7F8-8A75-4E8E-8A7F-8A9E35A68F9E",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mannash.in%2Fproducts%2Fblossom-circle-rose-gold-plated-sterling-silver-pendant&psig=AOvVaw05L-eNLMzkgyiya_S96why&ust=1737542534340000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjBpMLQhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P036",
    description: "Rose Gold Anklet with Beads",
    stock: 25,
    price: 700,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://www.google.com/imgres?q=anklet%20for%20girls&imgurl=https%3A%2F%2Frukminim2.flixcart.com%2Fimage%2F850%2F1000%2Fl23mhzk0%2Fanklet%2Fz%2Fr%2Fl%2Fna-na-1-208-naksh-original-imagdgrehuf6rjf5.jpeg%3Fq%3D20%26crop%3Dfalse&imgrefurl=https%3A%2F%2Fwww.flipkart.com%2Fnaksh-nakshstylish-design-anklets-girls-women-s-alloy-anklet-silver%2Fp%2Fitm6db778612286e%3Fpid%3DANKGDGRFVCSSYBRN&docid=XQzP3NWdGsJcjM&tbnid=gE1UD4K5TvEZCM&vet=12ahUKEwiT-YWd0YaLAxVznokEHa6hHucQM3oFCIABEAA..i&w=800&h=1000&hcb=2&ved=2ahUKEwiT-YWd0YaLAxVznokEHa6hHucQM3oFCIABEAA",
  },
  {
    SKU: "P037",
    description: "Silver Stud Earrings Set",
    stock: 50,
    price: 300,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fearring&psig=AOvVaw3DhNKxiJbpXPrzgMyDvZwB&ust=1737542036360000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCF8OzOhosDFQAAAAAdAAAAABAE",
  },
  {
    SKU: "P038",
    description: "Gold Wedding Band",
    stock: 30,
    price: 2500,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://www.google.com/imgres?q=mens%20band&imgurl=https%3A%2F%2Fwww.candere.com%2Fmedia%2Fjewellery%2Fimages%2Fgr00071_1_1.jpg&imgrefurl=https%3A%2F%2Fwww.candere.com%2Forlando-gold-wedding-band-for-him.html&docid=8ztnaLERGH08PM&tbnid=mBZdeZlMcJYttM&vet=12ahUKEwiHqb_L0YaLAxVCjIkEHbOtD5kQM3oECBkQAA..i&w=900&h=900&hcb=2&ved=2ahUKEwiHqb_L0YaLAxVCjIkEHbOtD5kQM3oECBkQAA",
  },
];

export { products };

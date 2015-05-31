# Don't have HTTParty? Just run `gem install httparty`
require 'httparty'

def create_list
  list = Hash.new

  1.upto(114).each do |index|
    response = HTTParty.get("http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=sura%20#{index}&format=json&rawcontinue&srprop=snippet&srredirects=true&srinterwiki=true")
    list[index] = response['query']['search'][0]['title']
    puts "Finished Surah: #{index}"
  end

  File.open("./quran-wiki-titles.json","w") do |f|
    f.write(list.to_json)
  end
end

create_list()

# Make the HTTP call to:
# Where titles=THE_TITLE_OF_SURAH
# http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=ali_imran&redirects=true


# For wiki api, please refer to:
# http://www.mediawiki.org/wiki/API:Main_page#A_simple_example
# http://www.mediawiki.org/wiki/API:Query#Specifying_pages
# http://www.mediawiki.org/wiki/API:Search

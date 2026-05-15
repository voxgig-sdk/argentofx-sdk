# Argentofx SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ArgentofxFeatures
  def self.make_feature(name)
    case name
    when "base"
      ArgentofxBaseFeature.new
    when "test"
      ArgentofxTestFeature.new
    else
      ArgentofxBaseFeature.new
    end
  end
end

#!/usr/bin/env ruby
#
# encoding: UTF-8
#
# Glǽmscribe (also written Glaemscribe) is a software dedicated to
# the transcription of texts between writing systems, and more 
# specifically dedicated to the transcription of J.R.R. Tolkien's 
# invented languages to some of his devised writing systems.
# 
# Copyright (C) 2015 Benjamin Babut (Talagan).
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
# 
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.


SCRIPT_PATH = File.dirname(__FILE__)
require SCRIPT_PATH + "/../lib_rb/glaemscribe.rb"

Glaemscribe::API::Debug.enabled = false

def unit_test_directory(directory)
  
  puts "Testing now test base : #{directory}"
  
  Dir.glob(directory + "/sources/*/" ) { |dirent|
    
    full_name    = File.basename(dirent)    
    mode_name    = full_name.split(".")[0]
     
    mode      = Glaemscribe::API::ResourceManager::loaded_modes[mode_name]
    if !mode
      puts "[    ] " + full_name + " : this mode is not loaded."
      next      
    end
    
    if mode.errors.any?
      puts "[    ] " + full_name + " : this mode has some errors."
      next     
    end
    
    mode_options = {}
    charset_name = nil
    opt_file  = dirent[0..dirent.length-2] + ".options"
    if File.exists? opt_file
      # There is an option file, parse it
      File.open(opt_file,"rb") { |f|
          ofl = f.read.lines
          charset_name = ofl[0].strip
          opt_line     = ofl[1].strip
          a = opt_line.strip.split(",").map{ |o| o.split(":") }.flatten.map{|s| s.strip }
          mode_options = Hash[*a]    
      }
    end
    
    mode.finalize(mode_options)    
    charset = mode.supported_charsets[charset_name]
    if !charset
      charset = mode.default_charset
    end
  
    Dir.glob(directory + "/sources/" + full_name + "/*") { |fok|
    
      bfname = File.basename(fok)
      prefix = "#{full_name} : #{bfname} : "
    
      true_teng = ""
      teng      = ""
      source    = ""
    
      begin
        File.open( directory + "/sources/" + full_name + "/" + bfname,"rb:utf-8") { |f| source = f.read}
      rescue Exception
        puts "[    ] " + prefix + "Could not open source file."
        next
      end
    
      begin
        File.open( directory + "/expecteds/" + full_name + "/" + bfname,"rb:utf-8") { |f| true_teng = f.read}
      rescue Exception
        puts "[    ] " + prefix + "Could not open expected file."
        next
      end     
    
      if true_teng.strip == ""
        puts "[    ] " + prefix + "Expected file is empty!!"
        next
      end
    
      source             = source.lines.map{|l| l.strip }.join("\n").strip
      true_teng          = true_teng.lines.map{|l| l.strip }.join("\n").strip
      success, teng      = mode.transcribe(source, charset)
   
      if !success
        puts "[****]" + teng
        next
      end
    
      teng = teng.strip
    
      if true_teng != teng
        puts "[****] " + prefix
            
        teng_lines      = teng.lines.to_a
        true_teng_lines = true_teng.lines.to_a
        source_lines    = source.lines.to_a
      
        puts "========== Diff =========="
    
        true_teng_lines.each_with_index{|true_line, index|
          break if index >= teng_lines.count
        
          diff_line   = ""
          true_line   = true_line.strip
          teng_line   = teng_lines[index].strip
          source_line = source_lines[index].strip
        
          true_line.length.times{ |i|
          
            if i >= teng_line.length || teng_line[i] != true_line[i] 
              diff_line += "o"
            else
              diff_line += "." 
            end
          }    
          next if true_line == teng_line
        
          puts "S: " + source_line.inspect
          puts "G: " + true_line.inspect
          puts "T: " + teng_line.inspect
          puts "D: " + diff_line.inspect
        
        }
        puts "=========================="        
      else
        puts "[ OK ] " + prefix + "Yay."     
      end
    }  
  }
      
end


def dump_test_directory(directory, dump_directory)
  
  puts "Dumping now test base : #{directory}"
  
  FileUtils.rm_rf Dir.glob(dump_directory + '/sources/*')
  FileUtils.rm_rf Dir.glob(dump_directory + '/expecteds/*')
   
  Dir.glob(directory + "/sources/*/" ) { |dirent|
    
    full_name    = File.basename(dirent)    
    mode_name    = full_name.split(".")[0]
     
    mode      = Glaemscribe::API::ResourceManager::loaded_modes[mode_name]
    if !mode
      puts "[    ] " + full_name + " : this mode is not loaded."
      next      
    end
    
    if mode.errors.any?
      puts "[    ] " + full_name + " : this mode has some errors."
      next     
    end
    
    FileUtils.mkdir_p( dump_directory + "/sources/"   + full_name)
    FileUtils.mkdir_p( dump_directory + "/expecteds/" + full_name)
    
    mode_options = {}
    charset_name = nil
    opt_file  = dirent[0..dirent.length-2] + ".options"
    if File.exists? opt_file
      content = ""
      # There is an option file, parse it
      File.open(opt_file,"rb") { |f|
        content = f.read
        ofl = content.lines
        charset_name = ofl[0].strip
        opt_line     = ofl[1].strip
        a = opt_line.strip.split(",").map{ |o| o.split(":") }.flatten.map{|s| s.strip }
        mode_options = Hash[*a]    
      }
      # Copyt the option file
      oname = File.basename(opt_file)
      File.open( dump_directory + "/sources/" + oname,"wb:utf-8") { |fw|    
        fw << content
      }
    end
    
    mode.finalize(mode_options)    
    charset = mode.supported_charsets[charset_name]
    if !charset
      charset = mode.default_charset
    end
    
 
    Dir.glob(directory + "/sources/" + full_name + "/*") { |fok|
    
      bfname = File.basename(fok)
      prefix = "#{full_name} : #{bfname} : "
  
      source = "" 
      begin
        File.open( directory + "/sources/" + full_name + "/" + bfname,"rb:utf-8") { |f| source = f.read}
      rescue Exception
        puts "[    ] " + prefix + "Could not open source file."
        next
      end
    
      File.open( dump_directory + "/sources/"   + full_name + "/" + bfname,"wb:utf-8") { |fw|    
        fw << source 
      }
    
      File.open( dump_directory + "/expecteds/" + full_name + "/" + bfname,"wb:utf-8") { |fw|    
        success, teng      = mode.transcribe(source, charset)
        fw << teng 
      }
    }  
    
  }
end

puts "Launching unit tests on the whole sample knowledge base to test if all modes are still ok..."

# Load all modes
Glaemscribe::API::ResourceManager::load_modes

# Print problems if modes have errors
Glaemscribe::API::ResourceManager::loaded_modes.each{ |name,mode|  
  if(mode.errors.any?)
    mode.errors.each{ |e|
      puts "** #{mode.name}:#{e.line}: #{e.text}"
    }
    next
  end
}
 
if ARGV[0] == "--dump" 
  dump_test_directory(SCRIPT_PATH + "/../unit_tests/glaemscrafu", SCRIPT_PATH + "/../unit_tests_dumped/glaemscrafu" )
else
  unit_test_directory(SCRIPT_PATH + "/../unit_tests/glaemscrafu")
end

# puts Glaemscribe::API::ResourceManager::loaded_modes['quenya'].finalize("implicit_a" => "true").options['implicit_a_unutixe'].visible?